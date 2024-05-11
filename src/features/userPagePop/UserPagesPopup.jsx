const UserPagesPopup = ({ pages, onClose, onSelectPage }) => {
  return (
    <div className="overlay">
      <div className="popup">
        <button onClick={onClose}>Close</button>
        <div id="pagesList">
          {pages.map((page) => (
            <div key={page._id} onClick={() => onSelectPage(page.elements)}>
              {page.userId}  // Displaying userId, you might want to display something more descriptive
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserPagesPopup;
