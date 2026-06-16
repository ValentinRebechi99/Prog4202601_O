import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pdfController = async (req, res) => {
    try {
        const { body } = req;
        const dynamicData = {
            nombre: body.nombre,
            apellido: body.apellido,
            dni: body.dni,
            nombre_curso: body.curso
        };

        const templatePath = path.join(__dirname,'..','templates', 'certificado_template.hbs');
        const templateHtml = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(templateHtml);
        const finalHtml = compiledTemplate(dynamicData);

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        const page = await browser.newPage();

        await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                bottom: '20px',
                left: '20px',
                right: '20px'
            }
        });

        await browser.close();

        res.contentType("application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=${body.apellido}_certificado.pdf`);
        return res.send(pdfBuffer);

    } catch (error) {
        console.error("PDF Generation Error:", error);
        return res.status(500).json({ error: "Failed to generate PDF" });
    }
};