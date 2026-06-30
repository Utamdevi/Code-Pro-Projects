/**
 * Simulates a network request to save a new task.
 * @param {Object} taskData - The task details from the form.
 * @returns {Promise<Object>} The server response.
 */
export const createTask = (taskData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic fallback safety check
      if (!taskData.title || !taskData.assignee || !taskData.dueDate || !taskData.priority) {
        reject(new Error("Missing required fields."));
      } else {
        resolve({
          success: true,
          data: {
            id: `task-${Date.now()}`,
            ...taskData,
            createdAt: new Date().toISOString(),
          },
        });
      }
    }, 900); // Mimics the 900ms delay in your original code
  });
};