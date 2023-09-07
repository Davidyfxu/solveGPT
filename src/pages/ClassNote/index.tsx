import React, { useEffect, useState } from "react";
import { getNoteKinds, getNotes } from "../api";
import NoteTable from "./components/NoteTable";

const ClassNote = () => {
  const [loading, setLoading] = useState(false);
  const [kindMap, setKindMap] = useState({});
  const [noteList, setNoteList] = useState([]);
  const get_note_kinds = async () => {
    try {
      setLoading(true);
      let res = {};
      const { note_kinds = [] } = await getNoteKinds({});
      note_kinds.forEach((k) => (res[k.value] = k.label));
      setKindMap(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const get_notes = async () => {
    try {
      setLoading(true);
      const { notes = [] } = await getNotes({});
      setNoteList(notes.map((note, index) => ({ ...note, key: index })));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void get_note_kinds();
  }, []);

  useEffect(() => {
    void get_notes();
  }, []);

  return (
    <div style={{ margin: 8 }}>
      <NoteTable
        kindMap={kindMap}
        noteList={noteList}
        setNoteList={setNoteList}
        loading={loading}
      />
    </div>
  );
};

export default ClassNote;
