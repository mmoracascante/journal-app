import { fileUpload } from "../../helpers"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dzwqbhnmc',
    api_key: '389834781493285',
    api_secret: 'IOyeU2Pmzl_YabTmvrHsjA2KIGU',
    secure: true,
})

describe('Testing the helper fileUpload', () => {

    test('Should upload the file to cloudinary', async () => {
        const imgUrl = 'https://png.pngtree.com/png-vector/20191121/ourmid/pngtree-blue-bird-vector-or-color-illustration-png-image_2013004.jpg'

        const response = await fetch(imgUrl)
        const blob = await response.blob()
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload(file)
        expect(typeof url).toBe('string')

        const segments = url.split('/')
        const imgId = segments[segments.length - 1].replace('.jpg', '')
        const cloudResponse = await cloudinary.api.delete_resources(['journal/' + imgId], {
            resource_type: 'image'
        })

        console.log(cloudResponse)
    })

    test('Should return null', async () => {
        // const imgUrl = 'https://png.pngtree.com/png-vector/20191121/ourmid/pngtree-blue-bird-vector-or-color-illustration-png-image_2013004.jpg'

        // const response = await fetch(imgUrl)
        // const blob = await response.blob()
        const file = new File([], 'foto.jpg')

        const url = await fileUpload(file)
        expect(url).toBe(null)
    })
})