import { useState, useEffect } from "react";
import { X } from "lucide-react";

const App = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [allNotes, setAllNotes] = useState(() => {
    const notes = localStorage.getItem("allNotes");
    return notes ? JSON.parse(notes) : [];
  });
  const [currentActiveIdx, setCurrentActiveIdx] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
  }, [allNotes]);

  function addNotes(e) {
    if (title === "" && note === "") {
      alert("Enter something....");
      return;
    }
    e.preventDefault();
    setAllNotes((prevNotes) => [{ title, note }, ...prevNotes]);
    setTitle("");
    setNote("");
  }

  function deleteNotes(idx) {
    const copyNotes = [...allNotes];
    copyNotes.splice(idx, 1);
    setAllNotes(copyNotes);
  }

  function editNotes() {
    setIsVisible(true);
    setTitle(allNotes[currentActiveIdx].title);
    setNote(allNotes[currentActiveIdx].note);
    deleteNotes(currentActiveIdx);
    setCurrentActiveIdx(null);
  }

  return (
    <div id="scrollbar-none" className="min-h-screen w-screen flex flex-col md:flex-row bg-slate-950 p-2 sm:p-4 lg:p-6 relative">
      {isVisible && (
        <>
          <div className="md:flex-1 p-2">
            <h1 className="text-3xl sm:text-4xl text-white font-medium">Add Notes</h1>
            <form onSubmit={(e) => addNotes(e)} className="flex flex-col space-y-4 mt-4">
              <input
                className="py-1.5 px-2 text-lg bg-slate-500 text-slate-900 rounded-lg outline-none"
                type="text"
                placeholder="Enter notes heading..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="py-1.5 px-2 text-md bg-slate-500 rounded-lg outline-none md:h-[calc(100vh-230px)] text-slate-900 md:resize-none"
                placeholder="Write notes..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              <button className="py-1.5 px-2 bg-slate-500 rounded-lg active:scale-90 hover:bg-slate-400 cursor-pointer">
                Add Notes
              </button>
            </form>
          </div>
          <div className="md:flex-1 mt-4 md:mt-0 rounded-lg p-2">
            <h1 className="text-3xl sm:text-4xl text-white font-medium text-center py-2">Your Notes</h1>
            <div id="scrollbar-none" className="bg-slate-900 p-2 md:h-[calc(100vh-125px)] rounded-lg overflow-auto flex flex-wrap items-start content-start gap-4">
              {allNotes.map((note, idx) => {
                return (
                  <div
                    onClick={() => {
                      setCurrentActiveIdx(idx);
                      setIsVisible(false);
                    }}
                    key={idx}
                    className="h-52 w-40 p-2 grow rounded-lg flex flex-col items-center bg-slate-500 overflow-hidden cursor-pointer"
                  >
                    <h1 className="w-full text-slate-900 font-bold text-center text-2xl wrap-break-word mt-10">
                      {note.title}
                    </h1>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotes(idx);
                      }}
                      className="mt-auto bg-slate-900 text-white rounded-lg font-semibold px-4 py-1.5 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {currentActiveIdx !== null && (
        <div className="h-screen w-screen bg-slate-600 absolute top-0 left-0 z-50">
          <div className="absolute top-4 right-2 flex gap-2 items-center">
            <button
              className="bg-slate-500 text-white rounded-lg font-semibold px-4 py-1.5 cursor-pointer"
              onClick={editNotes}
            >
              Edit
            </button>
            <X
              size={30}
              className="text-white cursor-pointer"
              onClick={() => {
                setCurrentActiveIdx(null);
                setIsVisible(true);
              }}
            />
          </div>
          <h1 className="min-h-16 pt-15 md:pt-4 bg-slate-900 text-white text-2xl wrap-break-word py-4 text-center font-bold">
            {allNotes[currentActiveIdx].title}
          </h1>
          <pre className="p-4 w-full overflow-x-hidden whitespace-pre-wrap break-all text-lg">
            {allNotes[currentActiveIdx].note}
          </pre>
        </div>
      )}
    </div>
  );
};

export default App;