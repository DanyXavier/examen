package com.lugardi.backend.services;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.lowagie.text.DocumentException;
import com.lugardi.backend.error.ResponseHandlerException;
import com.lugardi.backend.repository.PdfRepository;

@Service
public class PdfService implements PdfRepository {

    @Autowired
    TemplateEngine templateEngine;

    @Value("${pdf.directory}")
    private String pdfDirectory;

    @Override
    public Resource generatePdfFile(String templateName, Map<String, Object> data, String pdfFileName) {
        Context context = new Context();
        context.setVariables(data);
        String htmlContent = templateEngine.process(templateName, context);
        try {
            File outputFile = File.createTempFile(templateName, ".pdf");
            FileOutputStream fileOutputStream = new FileOutputStream(outputFile);
            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(htmlContent);
            renderer.layout();
            renderer.createPDF(fileOutputStream, false);
            renderer.finishPDF();
            return new UrlResource(outputFile.toPath().toUri());
        } catch (FileNotFoundException e) {
            throw new ResponseHandlerException(e.getMessage());
        } catch (DocumentException e) {
            throw new ResponseHandlerException(e.getMessage());
        } catch (IOException e) {
            throw new ResponseHandlerException(e.getMessage());
        }
        
    }
    
}
