const SearchBar = ({setUserID, searchBarOnSubmit}) => {
	const searchBarOnChange = (e) => {
		setUserID(e.target.value);
	};
	return (
		<form onSubmit={searchBarOnSubmit}>
			<input type="text" maxLength={20} minLength={20} onChange={searchBarOnChange} placeholder="Please input your ID to login" />
			<button>Login</button>
		</form>
	);
};

export default SearchBar;
