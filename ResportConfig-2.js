async function validfunction() {    
    if (window.location.href.indexOf('audit') > 0) {
        const urlGet = '../api/internal/legacy/1.0/datasource/get/1.0/cK9JBALjMx-ZBil7jn8QHmutf4ffb0fayII8pdOMuWRFl5IR1vbsmMASontbLyCcUQLRDKwYiMNueHPKNn6E-Q__';
        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(urlGet, requestOptions)
            .then(response => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(data => {
                        return data;
                    }).catch(error => {
                        throw Error(error);
                    });
                } else {
                    return response.text().then(text => {
                        throw Error(text);
                    });
                }
            })
            .then(response => {
                let valid = response.success.filter(s => s.fields.funcao.indexOf('Aluno') >= 0).length > 0;
                if (valid) {
                    const ms = document.querySelector('#PanelMessage');
                    const ff = document.querySelector('#PanelFile');
                    const tbl = document.querySelector('#TableStep');
                    const dd = document.querySelector('.dropdown');
                    const rows = tbl.querySelectorAll('.userAllocation');

                    if (ms) ms.style.display = 'none';
                    if (ff) ff.style.display = 'none';
                    if (dd) dd.style.display = 'none';

                    for (let i = 1; i < rows.length; i++) {
                        const td = rows[i].querySelector('[userid="1884"]');
                        if (td) td.closest('tr').style.display = 'none';

                        rows[i].style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error(`Erro na consulta da Fonte de dados <b>', ${error}`);
                throw Error(error);
            })
    }
}
validfunction();