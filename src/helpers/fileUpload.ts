
// Este helper nos ayuda a subir las imagenes de manera unsigned
// Solo se ocupo el endpoint, el nombre del cloud/upload
// En el body ocupamos enviar file y upload_preset
// Esta es una petición usando formData
export const fileUpload = async (file: any) => {
    if (!file) return null
    // if (!file) throw new Error('No tenemos ningún archivo a subir')
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dzwqbhnmc/upload'
    const formData = new FormData()
    formData.append('upload_preset', 'react-journal-app')
    formData.append('file', file)
    try {


        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData,
        })
        if (!response.ok) throw new Error('No se pudo subir las imagenes')
        const cloudResponse = await response.json()
        return cloudResponse.secure_url

    } catch (error: any) {
        return null
        // throw new Error(error.message)

    }


}
