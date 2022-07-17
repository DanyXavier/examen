package com.lugardi.backend;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.mockito.internal.verification.VerificationModeFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.lugardi.backend.models.Cuenta;
import com.lugardi.backend.services.ClienteService;
import com.lugardi.backend.services.CuentaService;

/*import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;*/
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.verify;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class CuentasControllerTest {
    @Autowired
    MockMvc mvc;

    @Autowired
    ClienteService clienteService;

    @MockBean
    CuentaService cuentaService;

    @Test
    void registroCuenta() throws Exception{
        Cuenta cuenta = new Cuenta(1l,"AHORRO",200d,true);
        given(cuentaService.guardarCuenta(Mockito.any(Cuenta.class))).willReturn(cuenta);

        //Cuenta posting = cuentaService.guardarCuenta(cuenta);

        //assertEquals(posting.getNumeroCuenta(), 1l, "Resultado esperado");
        mvc.perform(post("/cuenta")
        .contentType(MediaType.APPLICATION_JSON)
        .content(JsonUtil.toJson(cuenta)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.numeroCuenta").value(1l));

        verify(cuentaService, VerificationModeFactory.times(1))
        .guardarCuenta(Mockito.any(Cuenta.class));
        
        reset(cuentaService);
    }
}
