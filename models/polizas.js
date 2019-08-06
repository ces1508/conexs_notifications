const Siniestros = (sequalize, type) => {
  return sequalize.define('siniestros', {
    num_siniestro: { type: type.STRING },
    formato: { type: type.STRING },
    tipo_poliza: { type: type.STRING },
    aseguradora: { type: type.STRING },
    cedula_nit: { type: type.STRING, primaryKey: true },
    modalidad: { type: type.STRING },
    conductor: { type: type.STRING },
    placas: { type: type.STRING },
    empresa: { type: type.STRING },
    fecha_inicial: { type: type.DATE },
    fecha_final: { type: type.DATE },
    titular: { type: type.STRING },
    causa: { type: type.STRING },
    heridos: { type: type.STRING },
    muertos: { type: type.STRING },
    daños_materiales: { type: type.STRING },
    poliza: { type: type.STRING },
    reserva: { type: type.STRING },
    observaciones: { type: type.STRING },
    estado: { type: type.STRING },
    pagada: { type: type.STRING },
    telefono_contac: { type: type.STRING },
    e_mail_contac: { type: type.STRING },
    domicilio_contac: { type: type.STRING },
    fotos: { type: type.STRING }
  })
}

module.exports = Siniestros
