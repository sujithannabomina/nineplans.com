// app/api/comment/[id]/route.js
// Thin re-export so both /api/comment/:id and /api/comments/:id work.

export { GET, PATCH, DELETE } from '../../comments/[id]/route';
