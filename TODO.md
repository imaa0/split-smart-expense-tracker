# TODO: Implement Post-Creation Group Editing in CreateGroupModal

## Steps to Complete:

1. **Update Backend (server.js)**: Add PUT /api/groups/:id endpoint for updating group name and description. Ensure authentication and validation. Test API endpoint.

2. **Update CreateGroupModal.jsx**: 
   - Add props for edit mode (editGroup, onUpdate).
   - Implement dual mode: create (POST) and edit (PUT).
   - After successful creation, switch to edit mode with new group data pre-filled (no close/navigate).
   - Update UI: title, button text, form pre-population.
   - Handle save logic for both modes.

3. **Update ManagerDashboard.jsx**:
   - Add state for editGroup.
   - Modify onSave to set editGroup with new data (switch to edit mode).
   - Add onUpdate callback to handle edit saves (update local state, close modal).
   - Optionally, refresh groups list after create/edit.

4. **Testing**:
   - Run backend and frontend servers.
   - Login as manager, open modal, create group (verify switches to edit mode).
   - Edit name/description, save (verify updates in DB, modal behavior).
   - Use browser_action to verify UI flow.
   - Check for errors in console/DB.

5. **Cleanup**: Update TODO.md as steps complete. Use attempt_completion when done.
