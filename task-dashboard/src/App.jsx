import React from 'react';
import TaskForm from './components/TaskForm';

export default function App() {
  return (
    /* Canvas Base Layer: Midnight Blue mesh gradient layout */
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center relative px-4 overflow-hidden">
      
      {/* Dynamic Background Mesh Glow Layers */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Content wrapper */}
      <div className="w-full z-10 py-12">
        <TaskForm />
      </div>
    </div>
  );
}