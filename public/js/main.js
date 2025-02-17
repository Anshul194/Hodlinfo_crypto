document.addEventListener("DOMContentLoaded", function() {
    const fetchAndUpdateTickers = () => {
        fetch('/api/tickers')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('data-table');
                tableBody.innerHTML = '';
                data.forEach((item, index) => {
                    const row = `<tr>
                                    <td>${index + 1}</td>
                                    <td>${item.name}</td>
                                    <td>${item.last}</td>
                                    <td>${item.buy} / ${item.sell}</td>
                                    <td>${item.volume}</td>
                                    <td>${item.base_unit}</td>
                                 </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch(error => {
                console.error('Error fetching or updating tickers:', error);
            });
    };

    fetchAndUpdateTickers();

    setInterval(fetchAndUpdateTickers, 60 * 1000);
});
