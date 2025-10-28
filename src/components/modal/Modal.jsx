import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Modal({ type, onClose, isOpen, noteId }) {

    if (!isOpen) return null;
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const navigate = useNavigate();



    const closeModal = () => {

        if (type === 'add') {
            const noteObj = {
                title,
                note,
                date: new Date().toISOString().split('T')[0],
            }

            if (noteObj.title.length > 0 || noteObj.note.length > 0) {
                const draftNotes = localStorage.getItem('notes');
                if (draftNotes === null) {
                    const notesArr = [];
                    notesArr.unshift(noteObj);
                    localStorage.setItem('notes', JSON.stringify(notesArr));
                } else {
                    const notes = JSON.parse(draftNotes);
                    notes.unshift(noteObj);
                    localStorage.setItem('notes', JSON.stringify(notes));
                }
            }
        }
        setTitle('');
        setNote('');
        onClose();
        navigate('/dashboard');



    };

    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem('notes'));
        if (type === 'view') {
            setTitle(notes[noteId].title);
            setNote(notes[noteId].note);
        }

        if (type === 'edit') {
            setTitle(notes[noteId].title);
            setNote(notes[noteId].note);
        }
    }, [])



    return (
        <div className='h-screen max-w-[90%] md:max-w-[40%] mx-auto flex justify-center items-center'>
            <form className='flex w-full bg-white py-4 rounded-md border border-[#e9e9e9] flex-col gap-4 justify-center items-center mx-auto px-4'>
                <div className='flex justify-between items-center w-full'>
                    <p className='text-[#292929] md:text-[1.2rem] font-medium'>
                        {type === 'edit' ? 'Edit Note' : type === 'add' ? 'Add Note' : 'View Note'}
                    </p>

                    <button type='button' onClick={closeModal} className='cursor-pointer'>
                        <svg className='w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                        </svg>
                    </button>
                </div>

                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor="title" className='text-[#292929] text-sm'>Title</label>
                    <input id='title' value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='text-sm text-[#292929] border border-[#d1d1d1] rounded-md py-1 px-3 outline-none placeholder:text-sm' placeholder='Note Title' />
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor="note" className='text-[#292929] text-sm'>Note</label>
                    <textarea id='note' cols="40" rows="10" value={note} onChange={(e) => setNote(e.target.value)} className='text-sm text-[#292929] border border-[#d1d1d1] rounded-md py-1 px-3 outline-none placeholder:text-sm' placeholder='Note' />
                </div>

                {type === 'edit' ? (
                    <button className='bg-[#f9a51b] text-sm text-white w-full py-3 rounded-md cursor-pointer font-medium border border-[#fff0e0] flex gap-1 justify-center items-center'>
                        <span>
                            <svg className='text-white w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path>
                            </svg>
                        </span>
                        Edit</button>
                ) : type === 'add' ? (
                    <button className='bg-[#f9a51b] text-sm text-white w-full py-3 rounded-md cursor-pointer font-medium border border-[#fff0e0] flex gap-1 justify-center items-center'>
                        <svg className='text-white w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                        </svg>
                        Add</button>
                ) : null}

            </form>
        </div>
    );
}

export default Modal;
