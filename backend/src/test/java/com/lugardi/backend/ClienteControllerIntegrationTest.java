package com.lugardi.backend;

import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.lugardi.backend.models.Cliente;
import com.lugardi.backend.services.ClienteService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ClienteControllerIntegrationTest {
    @Autowired
    MockMvc mvc;

    @Autowired
    ClienteService service;

    @Test
    void createCliente() throws Exception{
        Cliente cliente = new Cliente(UUID.fromString("449a9138-388a-476c-a0f0-e94086a26f80"),"12345",true);
        mvc.perform(post("/cliente")
        .contentType(MediaType.APPLICATION_JSON)
        .content(JsonUtil.toJson(cliente)))
        .andExpect(status().isCreated());
        Cliente compare = service.obtenerClienteId(cliente.getId().toString());
        assertEquals(cliente.getId(),compare.getId());

    }
}
