package com.lugardi.backend.repository;

import java.util.Map;

import org.springframework.core.io.Resource;

public interface PdfRepository {
    Resource generatePdfFile(String templateName, Map<String, Object> data, String pdfFileName);
}
