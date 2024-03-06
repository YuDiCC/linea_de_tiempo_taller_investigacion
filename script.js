document.addEventListener("DOMContentLoaded", function () {
    const timelineContainer = document.getElementById("timeline-container");

    fetch("datos.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(entry => {
                // Generar un id único basado en el título (manejando caracteres especiales)
                const uniqueId = `timeline-item-${sanitizeTitleForId(entry.id)}`;
                entry.modalTitle = entry.title;

                const timelineItem = document.createElement("li");
                timelineItem.id = uniqueId; // Asignar el id al elemento li

                timelineItem.innerHTML = `
                    <h3 class="heading">${entry.title}</h3>
                    <p>${entry.description}</p>
                    <a href="#" class="read-more-link" data-modal-title="${entry.modalTitle}" data-modal-content="${entry.modalContent}" data-image-url="${entry.imageUrl}">Saber más ></a>
                    <span class="date">${entry.date}</span>
                    <span class="circle"></span>
                `;

                timelineContainer.appendChild(timelineItem);
            });

            const readMoreLinks = document.querySelectorAll('.read-more-link');
            readMoreLinks.forEach(link => {
                link.addEventListener('click', function (event) {
                    event.preventDefault();
                    const modalTitle = this.getAttribute('data-modal-title') || 'Detalles';
                    const modalContent = this.getAttribute('data-modal-content') || 'Contenido no disponible';
                    const imageUrl = this.getAttribute('data-image-url') || '';
                    openModal(modalTitle, modalContent, imageUrl);
                });
            });

            function openModal(title, content, imageUrl) {
                const modal = document.createElement('div');
                modal.className = 'modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-modal" onclick="closeModal()">&times;</span>
                        <h2>${title}</h2>
                        <img src="${imageUrl}" alt="${title} Image" class="modal-image">
                        <p>${content}</p>
                    </div>
                `;
                document.body.appendChild(modal);
            }

            window.closeModal = function () {
                const modal = document.querySelector('.modal');
                if (modal) {
                    document.body.removeChild(modal);
                }
            };

            // Función para sanear el título y crear un id válido
            function sanitizeTitleForId(title) {
                return title.replace(/\s+/g, '-').toLowerCase(); // Reemplazar espacios con guiones y convertir a minúsculas
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});
