package com.lugardi.backend.models;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.lugardi.backend.models.Clave.Persona;

@Entity
@Table
public class Cliente extends Persona {
    @Id
    @Type(type = "uuid-char")
    private UUID id = UUID.randomUUID();
    private String password;
    private Boolean estado;
    public Cliente(UUID id, String nombre, String genero, Integer edad, String identificacion, String direccion,
            String telefono, String password, Boolean estado) {
        super(nombre, genero, edad, identificacion, direccion, telefono);
        this.id = id;
        this.password = password;
        this.estado = estado;
    }
    public Cliente(UUID id, String password, Boolean estado) {
        super();
        this.id = id;
        this.password = password;
        this.estado = estado;
    }
    public Cliente(){
        super();
    }
    public UUID getId() {
        return id;
    }
    public void setId(String id) {
        this.id = UUID.fromString(id);
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Boolean getEstado() {
        return estado;
    }
    public void setEstado(Boolean estado) {
        this.estado = estado;
    }
    @Override
    public String toString() {
        return "Cliente [clienteId=" + id.toString() + ", estado=" + estado + ", password=" + password + "]";
    }
}
