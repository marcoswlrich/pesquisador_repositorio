const Template = (function(){
    const languageSelect = document.querySelector('#language-tags');
    const listElement = document.querySelector('#list');

    let listItems = [] 

    let languageTag = 'en-US';

    languageSelect.addEventListener('change', changeLanguage);

    function changeLanguage() {
        languageTag = languageSelect.value;
        render();
    }

    function setList(list) {
        listItems = list;
        render();
    }

    function render() {
        let html = '';
        const numberFormatter = new Intl.NumberFormat(languageTag);
        const dateFormatter = new Intl.DateTimeFormat(languageTag, {week: 'long', year: 'numeric', month: 'long', day: 'numeric'});
        listItems.forEach(item => {
            const forks = numberFormatter.format(item.forks);
            const created_at = dateFormatter.format( new Date(item.created_at) );
            html += `
                <li>
                    <div>
                        <b>Name:</b> ${item.full_name}
                    </div>
                    <div>
                        <b>Created At:</b> ${created_at}
                    </div>
                    <div>
                        <b>Forks:</b> ${forks}
                    </div>
                </li>
            `;
        })
        listElement.innerHTML = html;
    }
    return {
        setList
    }

})();

const Data = (function($){
    const searchInput = document.querySelector('#search');

    searchInput.addEventListener('keyup', search);

    function search(event){
        if(event && event.which === 13) {
           const searchQuery = searchInput.value;
           fetch(`https://api.github.com/search/repositories?q=${searchQuery}`)
                .then(response => response.json())
                .then(response => response.items)
                .then($.setList);

            
        }
    }
})(Template)

