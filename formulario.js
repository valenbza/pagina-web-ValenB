document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkoutForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const errorCampos = [
            'error-nombre', 'error-apellido', 'error-email',
            'error-celular', 'error-postal', 'error-direccion',
            'error-metodo-pago', 'error-terminos'
        ];

        errorCampos.forEach(id => document.getElementById(id).style.display = 'none');

        let valid= true;

        const nombre = document.getElementById('nombre').value.trim();
        if (nombre === '') {
            document.getElementById('error-nombre').style.display = 'block';
            valid = false;
        }

        const apellido = document.getElementById('apellido').value.trim();
        if (apellido === '') {
            document.getElementById('error-apellido').style.display = 'block';
            valid = false;
        }

        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('error-email').style.display = 'block';
            valid = false;
        }

        const celular = document.getElementById('celular').value.trim();
        if (celular === '' || isNaN(celular)) {
            document.getElementById('error-celular').style.display = 'block';
            valid = false;
        }

        const codigoPostal = document.getElementById('codigoPostal').value.trim();
        if (codigoPostal === '') {
            document.getElementById('error-postal').style.display = 'block';
            valid = false;
        }

        const direccion = document.getElementById('direccion').value.trim();
        if (direccion === '') {
            document.getElementById('error-direccion').style.display = 'block';
            valid = false;
        }

        const metodoPago = document.getElementById('metodoPago').value;
        if (metodoPago === '') {
            document.getElementById('error-metodo-pago').style.display = 'block';
            valid = false;
        }

        const terminos = document.getElementById('terminos').checked;
        if (!terminos) {
            document.getElementById('error-terminos').style.display = 'block';
            valid = false;
        }

        if (valid) {
            mostrarModalConfirmacion();
        }
    });
});

function mostrarModalConfirmacion() {
    const modalHTML = `
        <div class="modal fade" id="pedidoConfirmadoModal" tabindex="-1" aria-labelledby="pedidoConfirmadoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" id="pedidoConfirmadoModalLabel">¡Pedido realizado!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <p class="fs-5 text-center">¡Tu pedido ha sido realizado exitosamente!</p>
                        <p class="text-center small mb-1">Te llegará dentro de las próximas 24hs hábiles.</p>
                        <p class="text-center small">El comprobante será enviado a tu correo electrónico.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="aceptar-btn" data-bs-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>`;


    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal= new bootstrap.Modal(document.getElementById('pedidoConfirmadoModal'));
    modal.show();
    setTimeout(() => {
        document.getElementById('aceptar-btn').addEventListener('click', () => {
        localStorage.removeItem('cart');            
        window.location.href = 'index.html';           
        });
    }, 0);
}


