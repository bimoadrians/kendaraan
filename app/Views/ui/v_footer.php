</div>
<!-- / Layout page -->
</div>

<!-- Overlay -->
<div class="layout-overlay layout-menu-toggle"></div>
</div>

<div class="buy-now">
    <a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i
            class="fa-solid fa-arrow-up fa-lg"></i></a>
    <div id="preloader"></div>
</div>

<div class="modal" id="logout" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="modalTopTitle">Logout?</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="tab-content">
                    <div class="tab-pane active show" style="font-size:120%; text-align: center;">
                        <div class="mb-1">
                            Pilih "Logout" jika anda ingin keluar dari session ini
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" style="font-size:120%;">
                    Batalkan
                </button>
                <a class="btn btn-primary" href="<?php echo site_url("logout");?>" style="font-size:120%;">Logout</a>
            </div>
        </form>
    </div>
</div>

<script src="<?php echo base_url('admin')?>/js/jquery.dataTables.min.js"></script>

<script src="<?php echo base_url('sneat')?>/js/select2.min.js"></script>

<script src="<?php echo base_url('sneat')?>/js/jquery.datetimepicker.full.min.js"></script>

<script src="<?php echo base_url('admin')?>/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

<script>
$(document).ready(function() {
    $('#myTable').DataTable({
        "pageLength": 5,
        "pagingType": 'full_numbers',
        "lengthMenu": [
            [1, 5, 15, 50, 100, -1],
            [1, 5, 15, 50, 100, "All"]
        ],
    });
});
</script>

<script>
    $(document).ready(function() {
        $('#myTables').DataTable({
            "pageLength": 5,
            "pagingType": 'full_numbers',
            "lengthMenu": [
                [1, 5, 15, 50, 100, -1],
                [1, 5, 15, 50, 100, "All"]
            ],
        });
    });
</script>

<script>
    $(document).ready(function() {
        $('#mess_pending').DataTable({
            // "pageLength": -1,
            "pageLength": 5,
            "pagingType": 'full_numbers',
            "lengthMenu": [
                [1, 5, 15, 50, 100, -1],
                [1, 5, 15, 50, 100, "All"]
            ],
        });
    });
</script>

<script>
    $(document).ready(function() {
        $('#mess_confirm').DataTable({
            // "pageLength": -1,
            "pageLength": 5,
            "pagingType": 'full_numbers',
            "lengthMenu": [
                [1, 5, 15, 50, 100, -1],
                [1, 5, 15, 50, 100, "All"]
            ],
        });
    });
</script>

<script>
    $(document).ready(function() {
        $('#kamar1').DataTable({
            "pageLength": 3,
            "pagingType": 'full_numbers',
            "lengthMenu": [
                [1, 3, 5, 15, 50, 100, -1],
                [1, 3, 5, 15, 50, 100, "All"]
            ],
        });
    });
</script>

<script>
    $(document).ready(function() {
        $('#kamar2').DataTable({
            "pageLength": 3,
            "pagingType": 'full_numbers',
            "lengthMenu": [
                [1, 3, 5, 15, 18, 50, 100, -1],
                [1, 3, 5, 15, 18, 50, 100, "All"]
            ],
        });
    });
</script>

<script>
    $(document).ready(function() {
        $('#kamar3').DataTable({
            "pageLength": 2,
            "pagingType": 'full_numbers',
            "lengthMenu": [
                [1, 2, 5, 15, 18, 50, 100, -1],
                [1, 2, 5, 15, 18, 50, 100, "All"]
            ],
        });
    });
</script>

<script>
    $(document).ready(function() {
        $('#kamar4').DataTable({
            "pageLength": 2,
            "pagingType": 'full_numbers',
            "lengthMenu": [
                [1, 2, 5, 15, 18, 50, 100, -1],
                [1, 2, 5, 15, 18, 50, 100, "All"]
            ],
        });
    });
</script>

<script>
    $(document).ready(function() {
        $('#kamar5').DataTable({
            "pageLength": 2,
            "pagingType": 'full_numbers',
            "lengthMenu": [
                [1, 2, 5, 15, 18, 50, 100, -1],
                [1, 2, 5, 15, 18, 50, 100, "All"]
            ],
        });
    });
</script>

<script>
    $(document).ready(function() {
        $('#kamar6').DataTable({
            "pageLength": 2,
            "pagingType": 'full_numbers',
            "lengthMenu": [
                [1, 2, 5, 15, 18, 50, 100, -1],
                [1, 2, 5, 15, 18, 50, 100, "All"]
            ],
        });
    });
</script>

<script>
    $(document).ready(function() {
        $('#kamar7').DataTable({
            "pageLength": 4,
            "pagingType": 'full_numbers',
            "lengthMenu": [
                [1, 4, 5, 15, 18, 50, 100, -1],
                [1, 4, 5, 15, 18, 50, 100, "All"]
            ],
        });
    });
</script>

<script src="<?php echo base_url('sneat')?>/assets/vendor/libs/popper/popper.js"></script>
<script src="<?php echo base_url('sneat')?>/assets/vendor/js/bootstrap.js"></script>
<script src="<?php echo base_url('sneat')?>/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
<script src="<?php echo base_url('sneat')?>/assets/vendor/js/menu.js"></script>
<script src="<?php echo base_url('sneat')?>/assets/vendor/libs/apex-charts/apexcharts.js"></script>
<script src="<?php echo base_url('sneat')?>/assets/js/dashboards-analytics.js"></script>
<script src="<?php echo base_url('sneat')?>/assets/js/buttons.js"></script>
<script src="<?php echo base_url('sneat')?>/assets/js/main.js"></script>
</body>

</html>