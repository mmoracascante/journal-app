import { startNewNote } from "../../../store/journal/thunks"


describe('Testing journal thunks', () => {

    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach(() => jest.clearAllMocks())


    test('Must create a new note', async () => {
        const uid = 'TEST_UID'
        getState.mockReturnValue({ auth: { uid: uid } })



        await startNewNote()(dispatch, getState)
        // console.log(response)
    })
})