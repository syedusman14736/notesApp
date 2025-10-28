import React, { useEffect, useState } from 'react'
import Modal from '../components/modal/Modal';

function Dashboard() {

    const [isModal, setisModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [notes, setNotes] = useState([]);
    const [noteId, setNoteId] = useState();
    const [isUpdate, setIsUpdate] = useState(false);

    const handleClose = () => {
        setisModal(false);
    };

    const addHandler = () => {
        setModalType('add');
        setisModal(true);
    }

    const editHandler = (id) => {
        setNoteId(id)
        setModalType('edit');
        setisModal(true);
    }

    const viewHandler = (id) => {
        setNoteId(id)
        setModalType('view');
        setisModal(true);
    }

    const getDraftNote = () => {
        const draftNotes = JSON.parse(localStorage.getItem('notes'));
        setNotes([...draftNotes])
    }

    const deleteNote = (id) => {
        console.log(id);
        notes.splice(id, 1);
        const updatedNotes = JSON.stringify(notes);
        localStorage.setItem('notes', updatedNotes)
        setIsUpdate(true)
    }

    useEffect(() => {
        getDraftNote()
        setIsUpdate(false)
    }, [isModal, isUpdate])

    return (
        <div className='bg-[#f1f1f3] min-h-screen w-full py-4 relative'>
            <div>
                {isModal ? (
                    <Modal type={modalType} noteId={noteId} isOpen={isModal} onClose={handleClose} />
                ) : (

                    <>
                        <div className='bg-white rounded-md max-w-[90%] mx-auto flex justify-between items-center px-4 md:px-6 py-3 border border-[#e9e9e9]'>
                            <p className='text-[#292929] text-[1rem] md:text-[1.3rem] cursor-pointer inline-flex font-medium'>Notes</p>
                            <div className='flex gap-2 justify-center items-center'>
                                <button onClick={addHandler} className='bg-[#f9a51b] border border-[#e9e9e9] text-white text-xs md:text-sm flex justify-center items-center rounded-full cursor-pointer gap-1'>
                                    <svg className='text-white w-7 md:w-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                </button >
                                <div className='border border-[#292929] rounded-full cursor-pointer '>
                                    <span>
                                        <svg className='w-7 md:w-8 text-[#292929]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM6.02332 15.4163C7.49083 17.6069 9.69511 19 12.1597 19C14.6243 19 16.8286 17.6069 18.2961 15.4163C16.6885 13.9172 14.5312 13 12.1597 13C9.78821 13 7.63095 13.9172 6.02332 15.4163ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"></path></svg>
                                    </span>
                                </div>

                            </div>
                        </div>
                        <div className='bg-white rounded-md min-h-screen w-full max-w-[90%] mx-auto px-4 md:px-6 border border-[#e9e9e9] pt-4 pb-6 mt-4 relative'>
                            <div className='flex justify-between items-center border-b border-[#e9e9e9] pb-3'>

                                <div className='bg-[#fefbea] text-[#6c3115] px-4 py-2 rounded-md border border-[#f2e8ba] text-sm flex gap-2 justify-center'>
                                    <span>
                                        <svg className='w-5 text-[#6c3115]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"></path></svg>
                                    </span>
                                    Draft notes aren't saved permanently and might be lost later.</div>
                            </div>
                            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
                                {notes.length > 0 ? (
                                    notes.map((note, index) => (

                                        <div key={index} className='border border-[#e9e9e9] rounded-md px-3 py-4 flex flex-col gap-2'>

                                            <div className='border-b border-[#e9e9e9] flex justify-between items-center pb-2'>
                                                <p className='text-[#474747] text-sm'>{note.date}</p>
                                                <span className=' flex gap-1 justify-center items-center bg-[#fefbea] text-[#6c3115] px-2 py-1 border border-[#f2e8ba] text-sm rounded'>
                                                    <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2C20.5523 2 21 2.44772 21 3V6.757L19 8.757V4H5V20H19V17.242L21 15.242V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20ZM21.7782 8.80761L23.1924 10.2218L15.4142 18L13.9979 17.9979L14 16.5858L21.7782 8.80761ZM13 12V14H8V12H13ZM16 8V10H8V8H16Z"></path></svg>
                                                    Draft</span>
                                            </div>
                                            <p className='font-medium text-[#292929]'>{note.title || "Note Without Title"}</p>
                                            <p className='text-sm text-[#474747] text-wrap overflow-hidden'>{note.note || "Note Without Text"}</p>
                                            <div className='flex gap-1 md:gap-2 w-full pt-1'>
                                                <button onClick={() => deleteNote(index)} className='w-[60%] md:w-[70%] border flex gap-1 justify-center items-center border-white bg-[#ff323b] cursor-pointer rounded-md text-white text-sm py-2'>
                                                    <span>
                                                        <svg className='w-5 text-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
                                                    </span>
                                                    Delete</button>
                                                <button onClick={() => editHandler(index)} className='border w-[20%] md:w-[15%] border-[#e9e9e9] flex justify-center items-center py-1 cursor-pointer rounded-md'>
                                                    <span>
                                                        <svg className='text-[#474747] w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>
                                                    </span>
                                                </button>
                                                <button onClick={() => viewHandler(index)} className='border w-[20%] md:w-[15%] border-[#e9e9e9] flex justify-center items-center py-1 cursor-pointer rounded-md'>
                                                    <span>
                                                        <svg className='text-[#474747] w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
                                                    </span>
                                                </button>

                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>No Note Found</div>
                                )}
                            </div>
                        </div>
                    </>





                )}


            </div>
        </div>
    )
}

export default Dashboard