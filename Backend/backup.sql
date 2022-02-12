CREATE DATABASE "BDBDoctor"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

CREATE TABLE public.patients
(
    id text NOT NULL,
    name text NOT NULL,
    phone_number text NOT NULL,
    email text NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.patients
    OWNER to postgres;
COMMENT ON TABLE public.patients
    IS 'Pacientes';

CREATE TABLE public.meets
(
    id serial,
    time_meet time without time zone NOT NULL,
    date_meet date NOT NULL,
    id_patient text NOT NULL,
    PRIMARY KEY (id_patient),
    CONSTRAINT ct_meet FOREIGN KEY (id_patient)
        REFERENCES public.patients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.meets
    OWNER to postgres;
COMMENT ON TABLE public.meets
    IS 'Reuniones';