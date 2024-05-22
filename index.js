const { Pool } = require("pg")

const config ={
    host: "localhost",
    database: "estudiantes",
    port: 5432,
    user: process.env.USER,
    password: process.env.PASS
}

const pool = new Pool(config)

const insertAlumno = async () => {

    const text = "INSERT INTO alumnos (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *"
    
    const values = [process.argv[3], process.argv[4], process.argv[5], process.argv[6]]
       
    const response = await pool.query(text, values)

    console.log(`estudiante ${response.rows[0].nombre} agregado con exito`)
    console.log(response.rows)
}

// insertAlumno()

const consultaAlumnos = async () => {
    const text = "SELECT * FROM alumnos"
    
    const result = await pool.query(text)

    console.log(result.rows)
}

consultaAlumnos()

const updateAlumno = async () => {
    const text = "UPDATE alumnos SET nombre = $2 , curso = $3 , nivel = $4 WHERE rut = $1"
    const values = [process.argv[4], process.argv[3], process.argv[5], process.argv[6]]

    const result = await pool.query(text, values)
    console.log(`estudiante ${values[1]} editado con exito`)
}

// updateAlumno()

const rutAlumno = async () =>{
    const text = "SELECT * FROM alumnos WHERE rut = $1"
    const values = [process.argv[4]]

    const result = await pool.query(text, values)
    console.log(result.rows)
    
}

// rutAlumno()

const deleteAlumno = async () =>{
    const text = "DELETE FROM alumnos WHERE rut = $1"
    const values = [process.argv[4]]

    const result = await pool.query(text, values)
    console.log(`Registro de estudiante con rut ${process.argv[4]} eliminado con exito`)
}

// deleteAlumno()