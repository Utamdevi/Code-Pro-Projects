import React, { useState, useEffect } from 'react';
import { createTask } from '../services/api';

const ASSIGNEES = [
  { id: 'Aqsa', name: 'Aqsa Dahar', department: 'Design' },
  { id: 'priya', name: 'Priya Sharma', department: 'Engineering' },
  { id: 'Sareema', name: 'Sareema Imran', department: 'Product' },
  { id: 'Umrah', name: 'Umrah Saleem', department: 'Marketing' },
  { id: 'Fatime', name: 'Fatima', department: 'QA' },
  { id: 'Amarta', name: 'Amarta Rathi', department: 'Engineering' },
];

const INITIAL_STATE = {
  title: '',
  description: '',
  assignee: '',
  dueDate: '',
  priority: ''
};

export default function TaskForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBanner, setSuccessBanner] = useState(null);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const handlePrioritySelect = (level) => {
    setFormData(prev => ({ ...prev, priority: level }));
    if (errors.priority) setErrors(prev => ({ ...prev, priority: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    if (!formData.assignee) newErrors.assignee = 'Please select an assignee';
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else if (new Date(formData.dueDate) < today) {
      newErrors.dueDate = 'Due date must be today or in the future';
    }
    if (!formData.priority) newErrors.priority = 'Please select a priority level';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessBanner(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await createTask(formData);
      if (response.success) {
        const selectedUser = ASSIGNEES.find(u => u.id === formData.assignee);
        setSuccessBanner({
          title: response.data.title,
          assignee: selectedUser ? selectedUser.name : '',
          priority: response.data.priority
        });
        handleReset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      setErrors({ global: error.message || 'Something went wrong.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setErrors({});
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6" role="main">
      <h1 className=" text-slate-100 font-extrabold text-center p-1 ">Task creation and assignment form</h1>
      
      {/* Glassmorphism Card on Midnight Background */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-slate-100 flex items-center gap-2">
            <span className="text-indigo-400">✨</span> Create new task
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Fill in the details below. Fields marked <span className="text-rose-500">*</span> are required.
          </p>
        </div>

        {/* Success Banner */}
        {successBanner && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 flex items-center gap-3 mb-6 animate-fade-in" role="alert">
            <span className="text-emerald-400 text-lg">✓</span>
            <span className="text-sm text-emerald-300 font-medium">
              "{successBanner.title}" assigned to {successBanner.assignee} · {successBanner.priority} priority
            </span>
          </div>
        )}

        {errors.global && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3.5 text-sm text-rose-400 mb-6">
            ⚠️ {errors.global}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-xs font-medium text-slate-300 mb-1.5">
              Task title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              maxLength={80}
              placeholder="e.g. Design landing page mockup"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full h-10 px-3.5 text-sm rounded-xl bg-slate-950/80 border text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 ${
                errors.title ? 'border-rose-500/80' : 'border-slate-800'
              }`}
            />
            <div className="text-[10px] text-slate-500 mt-1 text-right">
              {formData.title.length}/80
            </div>
            {errors.title && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">⚠️ {errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-xs font-medium text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              maxLength={300}
              placeholder="Briefly describe what needs to be done…"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full h-24 p-3 text-sm rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 resize-y"
            />
            <div className="text-[10px] text-slate-500 mt-1 text-right">
              {formData.description.length}/300
            </div>
          </div>

          {/* Row: Assignee & Due Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Assignee */}
            <div>
              <label htmlFor="assignee" className="block text-xs font-medium text-slate-300 mb-1.5">
                Assignee <span className="text-rose-500">*</span>
              </label>
              <select
                id="assignee"
                value={formData.assignee}
                onChange={handleInputChange}
                className={`w-full h-10 px-3 text-sm rounded-xl bg-slate-950/80 border text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 color-scheme-dark ${
                  errors.assignee ? 'border-rose-500/80' : 'border-slate-800'
                }`}
              >
                <option value="" className="bg-slate-900">Select team member</option>
                {ASSIGNEES.map(user => (
                  <option key={user.id} value={user.id} className="bg-slate-900">
                    👤 {user.name} — {user.department}
                  </option>
                ))}
              </select>
              {errors.assignee && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">⚠️ {errors.assignee}</p>}
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-xs font-medium text-slate-300 mb-1.5">
                Due date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                id="dueDate"
                min={minDate}
                value={formData.dueDate}
                onChange={handleInputChange}
                className={`w-full h-10 px-3.5 text-sm rounded-xl bg-slate-950/80 border text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 color-scheme-dark ${
                  errors.dueDate ? 'border-rose-500/80' : 'border-slate-800'
                }`}
              />
              {errors.dueDate && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">⚠️ {errors.dueDate}</p>}
            </div>
          </div>

          {/* Priority Group */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Priority <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Priority level">
              {[
                { level: 'Low', activeClass: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400', dotClass: 'bg-emerald-500' },
                { level: 'Medium', activeClass: 'bg-amber-500/10 border-amber-500/50 text-amber-400', dotClass: 'bg-amber-500' },
                { level: 'High', activeClass: 'bg-rose-500/10 border-rose-500/50 text-rose-400', dotClass: 'bg-rose-500' }
              ].map(item => {
                const isSelected = formData.priority === item.level;
                return (
                  <button
                    key={item.level}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handlePrioritySelect(item.level)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-medium transition cursor-pointer select-none ${
                      isSelected 
                        ? item.activeClass 
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotClass}`} />
                    {item.level}
                  </button>
                );
              })}
            </div>
            {errors.priority && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">⚠️ {errors.priority}</p>}
          </div>

          {/* Footer UI Controls */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row gap-2.5 sm:justify-end items-center">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-5 h-10 text-sm rounded-xl bg-transparent border border-slate-800 text-slate-300 cursor-pointer hover:bg-slate-950/60 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 h-10 text-sm font-medium rounded-xl bg-indigo-600 text-white cursor-pointer flex items-center justify-center gap-2 hover:bg-indigo-500 transition active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting && (
                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              <span>{isSubmitting ? 'Creating…' : 'Create task'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}