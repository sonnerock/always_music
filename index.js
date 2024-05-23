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

    // const text = "INSERT INTO alumnos (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *"
    // const values = [process.argv[3], process.argv[4], process.argv[5], process.argv[6]]
    
    
    try{
        
        const queryConfig = {
            text: "INSERT INTO alumnos (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *",
            values: [process.argv[3], process.argv[4], process.argv[5], process.argv[6]],
            rowMode: "array"
    }
        const response = await pool.query(queryConfig)
        
        // console.log(`estudiante ${response.rows[3].nombre} agregado con exito`)
    } catch (error) {
        console.error("error status", error.code)
    }


    // console.log(response.rows)
}

// insertAlumno()

const consultaAlumnos = async () => {
    try {
        const queryConfig ={
            text: "SELECT * FROM alumnos",
            values: [],
            rowMode: "array"
        }
        
        const result = await pool.query(queryConfig)
    
    console.log(result.rows)
    
} catch (error) {
    console.error("error status", error.code)
    
}

}

// consultaAlumnos()

const updateAlumno = async () => {

    try {
        const queryConfig ={
            text : "UPDATE alumnos SET nombre = $2 , curso = $3 , nivel = $4 WHERE rut = $1",
            values: [process.argv[4], process.argv[3], process.argv[5], process.argv[6]],
            rowMode: "array"
        }

        const result = await pool.query(queryConfig)
        console.log(`estudiante ${values[1]} editado con exito`)
        
    } catch (error) {
        console.error("error status", error.code)       
    }

}
// updateAlumno()

// rut - "12.345.678-9"

const rutAlumno = async () =>{

    try {
        const queryConfig ={
            text: "SELECT * FROM alumnos WHERE rut = $1",
            values: [process.argv[4]],
            rowMode: "array"
        }

        const result = await pool.query(queryConfig)
        console.log(result.rows)
        
    } catch (error) {
        console.error("error status", error.code)
        
    }
}

// rutAlumno()

// eliminar  "Freddie Mercury" "9.876.543.21" vocalista 98

const deleteAlumno = async () =>{
    try {
    const queryConfig = {
        text: "DELETE FROM alumnos WHERE rut = $1",
        values: [process.argv[4]]
    }

    const result = await pool.query(queryConfig)
    console.log(`Registro de estudiante con rut ${process.argv[4]} eliminado con exito`)
    
} catch (error) {
    console.error("error status", error.code)
}
}

// deleteAlumno()