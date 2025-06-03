    
    <link href="<?php echo base_url('sneat')?>/assets/css/fullcalendar.css" rel="stylesheet" />
    <script src="<?php echo base_url('sneat')?>/js/moment.min.js"></script>
    <script src="<?php echo base_url('sneat')?>/js/fullcalendar.js"></script>
    
    <link href="<?php echo base_url('sneat')?>/assets/css/toastr.min.css" rel="stylesheet" />
    <script src="<?php echo base_url('sneat')?>/js/toastr.min.js"></script>

    <script src="<?php echo base_url('sneat')?>/fullcalendar/dist/index.global.js"></script>
    <script src="<?php echo base_url('sneat')?>/js/popper.min.js"></script>
    <script src="<?php echo base_url('sneat')?>/js/tooltip.min.js"></script>
    
                                            $(document).ready(function() {
                                                var calendar = $('#calendar').fullCalendar({
                                                    editable: true,
                                                    events: "<?php echo site_url("event"); ?>",
                                                    displayEventTime: false,
                                                    editable: true,
                                                    eventRender: function(event, element, view) {
                                                        if (event.allDay === 'true') {
                                                            event.allDay = true;
                                                        } else {
                                                            event.allDay = false;
                                                        }
                                                    },
                                                    selectable: true,
                                                    selectHelper: true,
                                                    select: function(start, end, allDay) {

                                                        var title = prompt('Event Title:');

                                                        if (title) {
                                                            var start = $.fullCalendar.formatDate(start, "Y-MM-DD");
                                                            var end = $.fullCalendar.formatDate(end, "Y-MM-DD");
                                                            $.ajax({
                                                                url: "<?php echo site_url("eventAjax"); ?>",
                                                                data: {
                                                                    title: title,
                                                                    start: start,
                                                                    end: end,
                                                                    type: 'add'
                                                                },
                                                                type: "POST",
                                                                success: function(data) {
                                                                    displayMessage("Event Created Successfully");

                                                                    calendar.fullCalendar('renderEvent', {
                                                                        id: data.id,
                                                                        title: title,
                                                                        start: start,
                                                                        end: end,
                                                                        allDay: allDay
                                                                    }, true);

                                                                    calendar.fullCalendar('unselect');
                                                                }
                                                            });
                                                        }
                                                    },

                                                    eventDrop: function(event, delta) {
                                                        var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD");
                                                        var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD");

                                                        $.ajax({
                                                            url: '<?php echo site_url("eventAjax"); ?>',
                                                            data: {
                                                                title: event.title,
                                                                start: start,
                                                                end: end,
                                                                id: event.id,
                                                                type: 'update'
                                                            },
                                                            type: "POST",
                                                            success: function(response) {

                                                                displayMessage("Event Updated Successfully");
                                                            }
                                                        });
                                                    },
                                                    eventClick: function(event) {
                                                        var deleteMsg = confirm("Do you really want to delete?");
                                                        if (deleteMsg) {
                                                            $.ajax({
                                                                type: "POST",
                                                                url: '<?php echo site_url("eventAjax"); ?>',
                                                                data: {
                                                                    id: event.id,
                                                                    type: 'delete'
                                                                },
                                                                success: function(response) {

                                                                    calendar.fullCalendar('removeEvents', event.id);
                                                                    displayMessage("Event Deleted Successfully");
                                                                }
                                                            });
                                                        }
                                                    }

                                                });
                                            });

                                            function displayMessage(message) {
                                            toastr.success(message, 'Event');
                                            }

                                        <div id='calendar' class="text-center" style="width:100%; font-size:20px;"></div>
                                        <script>
                                            document.addEventListener('DOMContentLoaded', function() {
                                                var calendarEl = document.getElementById('calendar');
                                                var modal_transport = document.getElementById('data_transport');

                                                var calendar = new FullCalendar.Calendar(calendarEl, {
                                                    customButtons: {
                                                        kembali: {
                                                            text: 'Kembali',
                                                            click: function() {
                                                                window.location = "<?php echo site_url("set_driver/$id_trans/$id_transportasi/$id_transportasi_jemput/?aksi=cancel_confirm&id_trans=$id_trans&id_transportasi=$id_transportasi&id_transportasi_jemput=$id_transportasi_jemput"); ?>";
                                                            }
                                                        },
                                                        data_transport: {
                                                            text: 'Data Transport',
                                                            click: function() {
                                                                $('#data_transport').modal('toggle');
                                                            }
                                                        }
                                                    },
                                                    headerToolbar: {
                                                    left: 'kembali prev,next today',
                                                    center: 'title',
                                                    right: 'data_transport dayGridMonth,timeGridWeek,timeGridDay'
                                                    },
                                                    initialDate: '<?php echo $date?>',
                                                    navLinks: true, // can click day/week names to navigate views
                                                    selectable: true,
                                                    selectMirror: true,
                                                    select: function(arg) {
                                                        $('#set_driver').modal('toggle');
                                                        calendar.unselect()
                                                    },
                                                    editable: true,
                                                    dayMaxEvents: true, // allow "more" link when too many events
                                                    eventDidMount: function(arg) {
                                                        var tooltip = new Tooltip(arg.el, {
                                                        title: arg.event.extendedProps.description,
                                                        placement: 'top',
                                                        trigger: 'hover',
                                                        container: 'body'
                                                        });
                                                    },
                                                    <?php foreach ($set_driver as $st => $set) {?>
                                                        eventClick: function(arg) {
                                                            $('#show_driver').modal('toggle');
                                                        },
                                                        events: [
                                                            {
                                                                title: '<?php echo $set['nama_pengemudi']?>',
                                                                start: '<?php echo $set['tanggal_mobil']?>'
                                                            },
                                                            {
                                                                title: '<?php echo $set['tujuan_mobil']?>',
                                                                start: '<?php echo $set['tanggal_mobil']?><?php echo "T"?><?php echo $set['jam_siap']?>'
                                                            }
                                                        ]
                                                    <?php } ?>
                                                });
                                                calendar.render();
                                            });
                                        </script>

                                        <div class="modal" id="data_transport" tabindex="-1" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h2 class="modal-title" id="modalTopTitle">Data Transport</h2>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="tab-content">
                                                            <div class="tab-pane active show" style="font-size:120%; text-align: center;">
                                                                <form action="" method="post" enctype="multipart/form-data">
                                                                    <div class="table-responsive text-nowrap">
                                                                        <table class="text-center" style="width: 100%;">
                                                                            <tbody>
                                                                                <?php foreach ($trans as $t => $tra) {?>
                                                                                    <?php if ($tra['batal'] < 2) { ?>
                                                                                        <?php foreach ($transportasi_antar as $tr => $transpo) { ?>
                                                                                            <?php if ($transpo['id_trans'] == $tra['id_trans']) { ?>
                                                                                                <?php if ($transpo['jemput'] == 0) { ?>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jenis Kendaraan:</th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php 
                                                                                                            if($transpo['jenis_kendaraan'] == 's'){
                                                                                                                $jenis_kendaraan = 'Sedan';
                                                                                                            } else if($transpo['jenis_kendaraan'] == 'a'){
                                                                                                                $jenis_kendaraan = 'Station';
                                                                                                            } else if($transpo['jenis_kendaraan'] == 'p'){
                                                                                                                $jenis_kendaraan = 'Pick Up';
                                                                                                            } else if($transpo['jenis_kendaraan'] == 'b'){
                                                                                                                $jenis_kendaraan = 'Box';
                                                                                                            } else if($transpo['jenis_kendaraan'] == 't'){
                                                                                                                $jenis_kendaraan = 'Truck';
                                                                                                            }
                                                                                                            ?>
                                                                                                            <?php echo $jenis_kendaraan ?>
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Butuh Tenaga Angkut?:</th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                            <?php 
                                                                                                                if($transpo['tenaga_angkut'] == '1'){
                                                                                                                    $tenaga_angkut = 'Iya';
                                                                                                                } else {
                                                                                                                    $tenaga_angkut = 'Tidak';
                                                                                                                }
                                                                                                            ?>
                                                                                                            <?php echo $tenaga_angkut ?>
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Dalam/Luar Kota:</th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                            <?php
                                                                                                                if($transpo['dalkot_lukot'] == 'd'){
                                                                                                                    $dalkot_lukot = 'Dalam Kota';
                                                                                                                } else if($transpo['dalkot_lukot'] == 'l'){
                                                                                                                    $dalkot_lukot = 'Luar Kota';
                                                                                                                }
                                                                                                            ?>
                                                                                                            <?php echo $dalkot_lukot ?>
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Menginap?:</th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                            <?php 
                                                                                                                if($transpo['menginap'] == '0'){
                                                                                                                    $menginap = 'Tidak';
                                                                                                                } else if($transpo['menginap'] == '1'){
                                                                                                                    $menginap = 'Iya';
                                                                                                                }
                                                                                                            ?>
                                                                                                            <?php echo $menginap ?>
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jumlah:</th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpo['jumlah_mobil']; ?></th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Kapasitas:</th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpo['kapasitas']; ?></th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Nama/Jabatan:</th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpo['atas_nama']; ?> <?php echo "(" ?><?php echo $transpo['jabatan']; ?><?php echo ")" ?></th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tanggal:</th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo date_transaksi_kendaraan($transpo['tanggal_mobil']); ?></th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jam:</th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpo['jam_siap']; ?></th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tujuan ke:</th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpo['tujuan_mobil']; ?></th>
                                                                                                    </tr>
                                                                                                <?php } else if ($transpo['jemput'] == 1) { ?>
                                                                                                    <?php foreach ($transportasi_jemput as $traj => $transpoaj) { ?>
                                                                                                        <?php if ($transpoaj['id_trans'] == $transpo['id_trans']) { ?>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jenis Kendaraan:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php 
                                                                                                                    if($transpoaj['jenis_kendaraan'] == 's'){
                                                                                                                        $jenis_kendaraan = 'Sedan';
                                                                                                                    } else if($transpoaj['jenis_kendaraan'] == 'a'){
                                                                                                                        $jenis_kendaraan = 'Station';
                                                                                                                    } else if($transpoaj['jenis_kendaraan'] == 'p'){
                                                                                                                        $jenis_kendaraan = 'Pick Up';
                                                                                                                    } else if($transpoaj['jenis_kendaraan'] == 'b'){
                                                                                                                        $jenis_kendaraan = 'Box';
                                                                                                                    } else if($transpoaj['jenis_kendaraan'] == 't'){
                                                                                                                        $jenis_kendaraan = 'Truck';
                                                                                                                    }
                                                                                                                    ?>
                                                                                                                    <?php echo $jenis_kendaraan ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Butuh Tenaga Angkut?:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                                    <?php 
                                                                                                                        if($transpoaj['tenaga_angkut'] == '1'){
                                                                                                                            $tenaga_angkut = 'Iya';
                                                                                                                        } else {
                                                                                                                            $tenaga_angkut = 'Tidak';
                                                                                                                        }
                                                                                                                    ?>
                                                                                                                    <?php echo $tenaga_angkut ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Dalam/Luar Kota:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                                    <?php
                                                                                                                        if($transpoaj['dalkot_lukot'] == 'd'){
                                                                                                                            $dalkot_lukot = 'Dalam Kota';
                                                                                                                        } else if($transpoaj['dalkot_lukot'] == 'l'){
                                                                                                                            $dalkot_lukot = 'Luar Kota';
                                                                                                                        }
                                                                                                                    ?>
                                                                                                                    <?php echo $dalkot_lukot ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Menginap?:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                                    <?php 
                                                                                                                        if($transpoaj['menginap'] == '0'){
                                                                                                                            $menginap = 'Tidak';
                                                                                                                        } else if($transpoaj['menginap'] == '1'){
                                                                                                                            $menginap = 'Iya';
                                                                                                                        }
                                                                                                                    ?>
                                                                                                                    <?php echo $menginap ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jumlah:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoaj['jumlah_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Kapasitas:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoaj['kapasitas']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Nama/Jabatan:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoaj['atas_nama']; ?> <?php echo "(" ?><?php echo $transpoaj['jabatan']; ?><?php echo ")" ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tanggal:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo date_transaksi_kendaraan($transpoaj['tanggal_mobil']); ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jam:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoaj['jam_siap']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tujuan ke:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoaj['tujuan_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                        <?php } ?>
                                                                                                    <?php } ?>
                                                                                                <?php } else if ($transpo['jemput'] == 2) { ?>
                                                                                                    <?php foreach ($transportasi_antar_jemput1 as $trj => $transpoj) { ?>
                                                                                                        <?php if ($transpoj['id_trans'] == $transpo['id_trans']) { ?>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jenis Kendaraan:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php 
                                                                                                                    if($transpoj['jenis_kendaraan'] == 's'){
                                                                                                                        $jenis_kendaraan = 'Sedan';
                                                                                                                    } else if($transpoj['jenis_kendaraan'] == 'a'){
                                                                                                                        $jenis_kendaraan = 'Station';
                                                                                                                    } else if($transpoj['jenis_kendaraan'] == 'p'){
                                                                                                                        $jenis_kendaraan = 'Pick Up';
                                                                                                                    } else if($transpoj['jenis_kendaraan'] == 'b'){
                                                                                                                        $jenis_kendaraan = 'Box';
                                                                                                                    } else if($transpoj['jenis_kendaraan'] == 't'){
                                                                                                                        $jenis_kendaraan = 'Truck';
                                                                                                                    }
                                                                                                                    ?>
                                                                                                                    <?php echo $jenis_kendaraan ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Butuh Tenaga Angkut?:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                                    <?php 
                                                                                                                        if($transpoj['tenaga_angkut'] == '1'){
                                                                                                                            $tenaga_angkut = 'Iya';
                                                                                                                        } else {
                                                                                                                            $tenaga_angkut = 'Tidak';
                                                                                                                        }
                                                                                                                    ?>
                                                                                                                    <?php echo $tenaga_angkut ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Dalam/Luar Kota:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                                    <?php
                                                                                                                        if($transpoj['dalkot_lukot'] == 'd'){
                                                                                                                            $dalkot_lukot = 'Dalam Kota';
                                                                                                                        } else if($transpoj['dalkot_lukot'] == 'l'){
                                                                                                                            $dalkot_lukot = 'Luar Kota';
                                                                                                                        }
                                                                                                                    ?>
                                                                                                                    <?php echo $dalkot_lukot ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Menginap?:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                                    <?php 
                                                                                                                        if($transpoj['menginap'] == '0'){
                                                                                                                            $menginap = 'Tidak';
                                                                                                                        } else if($transpoj['menginap'] == '1'){
                                                                                                                            $menginap = 'Iya';
                                                                                                                        }
                                                                                                                    ?>
                                                                                                                    <?php echo $menginap ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jumlah:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoj['jumlah_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Kapasitas:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoj['kapasitas']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Nama/Jabatan:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoj['atas_nama']; ?> <?php echo "(" ?><?php echo $transpoj['jabatan']; ?><?php echo ")" ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tanggal:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo date_transaksi_kendaraan($transpoj['tanggal_mobil']); ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jam:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoj['jam_siap']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tujuan ke:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoj['tujuan_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                        <?php } ?>
                                                                                                    <?php } ?>
                                                                                                    <?php foreach ($transportasi_antar_jemput2 as $trj2 => $transpoj2) { ?>
                                                                                                        <?php if ($transpoj2['id_trans'] == $transpo['id_trans']) { ?>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jenis Kendaraan:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php 
                                                                                                                    if($transpoj2['jenis_kendaraan'] == 's'){
                                                                                                                        $jenis_kendaraan = 'Sedan';
                                                                                                                    } else if($transpoj2['jenis_kendaraan'] == 'a'){
                                                                                                                        $jenis_kendaraan = 'Station';
                                                                                                                    } else if($transpoj2['jenis_kendaraan'] == 'p'){
                                                                                                                        $jenis_kendaraan = 'Pick Up';
                                                                                                                    } else if($transpoj2['jenis_kendaraan'] == 'b'){
                                                                                                                        $jenis_kendaraan = 'Box';
                                                                                                                    } else if($transpoj2['jenis_kendaraan'] == 't'){
                                                                                                                        $jenis_kendaraan = 'Truck';
                                                                                                                    }
                                                                                                                    ?>
                                                                                                                    <?php echo $jenis_kendaraan ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Butuh Tenaga Angkut?:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                                    <?php 
                                                                                                                        if($transpoj2['tenaga_angkut'] == '1'){
                                                                                                                            $tenaga_angkut = 'Iya';
                                                                                                                        } else {
                                                                                                                            $tenaga_angkut = 'Tidak';
                                                                                                                        }
                                                                                                                    ?>
                                                                                                                    <?php echo $tenaga_angkut ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Dalam/Luar Kota:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                                    <?php
                                                                                                                        if($transpoj2['dalkot_lukot'] == 'd'){
                                                                                                                            $dalkot_lukot = 'Dalam Kota';
                                                                                                                        } else if($transpoj2['dalkot_lukot'] == 'l'){
                                                                                                                            $dalkot_lukot = 'Luar Kota';
                                                                                                                        }
                                                                                                                    ?>
                                                                                                                    <?php echo $dalkot_lukot ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Menginap?:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">
                                                                                                                    <?php 
                                                                                                                        if($transpoj2['menginap'] == '0'){
                                                                                                                            $menginap = 'Tidak';
                                                                                                                        } else if($transpoj2['menginap'] == '1'){
                                                                                                                            $menginap = 'Iya';
                                                                                                                        }
                                                                                                                    ?>
                                                                                                                    <?php echo $menginap ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jumlah:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoj2['jumlah_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Kapasitas:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoj2['kapasitas']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Nama/Jabatan:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoj2['atas_nama']; ?> <?php echo "(" ?><?php echo $transpoj2['jabatan']; ?><?php echo ")" ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tanggal:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo date_transaksi_kendaraan($transpoj2['tanggal_mobil']); ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jam:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoj2['jam_siap']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px; background-color: #D6EEEE;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tujuan ke:</th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php echo $transpoj2['tujuan_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                        <?php } ?>
                                                                                                    <?php } ?>
                                                                                                <?php } ?>
                                                                                            <?php } ?>
                                                                                        <?php } ?>
                                                                                    <?php } ?>
                                                                                <?php } ?>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal" id="set_driver" tabindex="-1" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h2 class="modal-title" id="modalTopTitle">Set Driver</h2>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <form action="" method="post" enctype="multipart/form-data">
                                                        <div class="modal-body">
                                                            <div class="tab-content">
                                                                <div class="tab-pane active show" style="font-size:120%;">
                                                                    <?php foreach ($trans as $t => $tra) {?>
                                                                        <?php if ($tra['batal'] < 2) { ?>
                                                                            <?php foreach ($transportasi_antar as $tr => $transpo) { ?>
                                                                                <?php if ($transpo['id_trans'] == $tra['id_trans']) { ?>
                                                                                    <?php if ($transpo['jemput'] == 0) { ?>
                                                                                        <div class="mb-1">
                                                                                            User:
                                                                                        </div>
                                                                                        <div class="mb-3">
                                                                                            <input disabled type="text" class="form-control" name="atas_nama" id="atas_nama" value="<?php echo(isset($user1)) ? $user1 : $transpo['atas_nama'];?>">
                                                                                        </div>
                                                                                        <div class="mb-1">
                                                                                            Siap Di:
                                                                                        </div>
                                                                                        <div class="mb-3">
                                                                                            <input disabled type="text" class="form-control" name="siap_di" id="siap_di" value="<?php echo(isset($siap_di1)) ? $siap_di1 : $transpo['siap_di'];?>">
                                                                                        </div>
                                                                                        <div class="mb-1">
                                                                                            Jam:
                                                                                        </div>
                                                                                        <div class="mb-3">
                                                                                            <input disabled type="text" class="form-control" name="jam_siap_hidden" id="jam_siap_hidden" value="<?php echo(isset($jam_siap_hidden1)) ? $jam_siap_hidden1 : $transpo['jam_siap'];?>">
                                                                                            <input hidden type="text" class="form-control" name="jam_siap" id="jam_siap" value="<?php echo(isset($jam_siap1)) ? $jam_siap1 : $transpo['jam_siap'];?>">
                                                                                            <input hidden type="text" class="form-control" name="tanggal_mobil" id="tanggal_mobil" value="<?php echo(isset($tanggal_mobil1)) ? $tanggal_mobil1 : $transpo['tanggal_mobil'];?>">
                                                                                            <input hidden type="text" class="form-control" name="tujuan_mobil" id="tujuan_mobil" value="<?php echo(isset($tujuan_mobil1)) ? $tujuan_mobil1 : $transpo['tujuan_mobil'];?>">
                                                                                            <input hidden type="text" class="form-control" name="id_pool" id="id_pool" value="<?php echo(isset($id_pool1)) ? $id_pool1 : $transpo['id_pool'];?>">
                                                                                        </div>
                                                                                        <div class="mb-1">
                                                                                            Durasi (Menit):
                                                                                        </div>
                                                                                        <div class="mb-3">
                                                                                            <input required type="number" min="0" class="form-control" name="durasi" id="durasi">
                                                                                        </div>
                                                                                        <div class="mb-1 mt-3">
                                                                                            Driver
                                                                                        </div>
                                                                                        <select class="select_pengemudi" name="nama_pengemudi" style="width: 100%;"></select>
                                                                                        <script>
                                                                                            $(document).ready(function() {
                                                                                                var pengemudi = [
                                                                                                    <?php foreach ($pengemudi as $penge) : ?>"<?php echo $penge['nama_pengemudi']?>",<?php endforeach ?>
                                                                                                ]

                                                                                                $(".select_pengemudi").select2({
                                                                                                    data: pengemudi,
                                                                                                    // tags: true,
                                                                                                    // tokenSeparators: [',', ' '],
                                                                                                });

                                                                                                $('select:not(.normal)').each(function() {
                                                                                                    $(this).select2({
                                                                                                        dropdownParent: $(this)
                                                                                                            .parent()
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        </script>
                                                                                        <div class="mb-1 mt-3">
                                                                                            Mobil
                                                                                        </div>
                                                                                        <select class="select_mobil" name="nama_mobil" style="width: 100%;"></select>
                                                                                        <script>
                                                                                            $(document).ready(function() {
                                                                                                var mobil = [
                                                                                                    <?php foreach ($mobil_pengemudi as $mob_penge) : ?>"<?php echo $mob_penge['nama_mobil']?>",<?php endforeach ?>
                                                                                                ]

                                                                                                $(".select_mobil").select2({
                                                                                                    data: mobil,
                                                                                                    // tags: true,
                                                                                                    // tokenSeparators: [',', ' '],
                                                                                                });

                                                                                                $('select:not(.normal)').each(function() {
                                                                                                    $(this).select2({
                                                                                                        dropdownParent: $(this)
                                                                                                            .parent()
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        </script>
                                                                                    <?php } else if ($transpo['jemput'] == 1) { ?>
                                                                                        <?php foreach ($transportasi_jemput as $traj => $transpoaj) { ?>
                                                                                            <?php if ($transpoaj['id_trans'] == $transpo['id_trans']) { ?>
                                                                                                <div class="mb-1">
                                                                                                    User:
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input disabled type="text" class="form-control" name="atas_nama" id="atas_nama" value="<?php echo(isset($user1)) ? $user1 : $transpoaj['atas_nama'];?>">
                                                                                                </div>
                                                                                                <div class="mb-1">
                                                                                                    Siap Di:
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input disabled type="text" class="form-control" name="siap_di" id="siap_di" value="<?php echo(isset($siap_di1)) ? $siap_di1 : $transpoaj['siap_di'];?>">
                                                                                                </div>
                                                                                                <div class="mb-1">
                                                                                                    Jam:
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input disabled type="text" class="form-control" name="jam_siap_hidden" id="jam_siap_hidden" value="<?php echo(isset($jam_siap_hidden1)) ? $jam_siap_hidden1 : $transpoaj['jam_siap'];?>">
                                                                                                    <input hidden type="text" class="form-control" name="jam_siap" id="jam_siap" value="<?php echo(isset($jam_siap1)) ? $jam_siap1 : $transpoaj['jam_siap'];?>">
                                                                                                    <input hidden type="text" class="form-control" name="tanggal_mobil" id="tanggal_mobil" value="<?php echo(isset($tanggal_mobil1)) ? $tanggal_mobil1 : $transpoaj['tanggal_mobil'];?>">
                                                                                            <input hidden type="text" class="form-control" name="tujuan_mobil" id="tujuan_mobil" value="<?php echo(isset($tujuan_mobil1)) ? $tujuan_mobil1 : $transpoaj['tujuan_mobil'];?>">
                                                                                                    <input hidden type="text" class="form-control" name="id_pool" id="id_pool" value="<?php echo(isset($id_pool1)) ? $id_pool1 : $transpoaj['id_pool'];?>">
                                                                                                </div>
                                                                                                <div class="mb-1">
                                                                                                    Durasi (Menit):
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input required type="number" min="0" class="form-control" name="durasi" id="durasi">
                                                                                                </div>
                                                                                                <div class="mb-1 mt-3">
                                                                                                    Driver
                                                                                                </div>
                                                                                                <select class="select_pengemudi" name="nama_pengemudi" style="width: 100%;"></select>
                                                                                                <script>
                                                                                                    $(document).ready(function() {
                                                                                                        var pengemudi = [
                                                                                                            <?php foreach ($pengemudi as $penge) : ?>"<?php echo $penge['nama_pengemudi']?>",<?php endforeach ?>
                                                                                                        ]

                                                                                                        $(".select_pengemudi").select2({
                                                                                                            data: pengemudi,
                                                                                                            // tags: true,
                                                                                                            // tokenSeparators: [',', ' '],
                                                                                                        });

                                                                                                        $('select:not(.normal)').each(function() {
                                                                                                            $(this).select2({
                                                                                                                dropdownParent: $(this)
                                                                                                                    .parent()
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                </script>
                                                                                                <div class="mb-1 mt-3">
                                                                                                    Mobil
                                                                                                </div>
                                                                                                <select class="select_mobil" name="nama_mobil" style="width: 100%;"></select>
                                                                                                <script>
                                                                                                    $(document).ready(function() {
                                                                                                        var mobil = [
                                                                                                            <?php foreach ($mobil_pengemudi as $mob_penge) : ?>"<?php echo $mob_penge['nama_mobil']?>",<?php endforeach ?>
                                                                                                        ]

                                                                                                        $(".select_mobil").select2({
                                                                                                            data: mobil,
                                                                                                            // tags: true,
                                                                                                            // tokenSeparators: [',', ' '],
                                                                                                        });

                                                                                                        $('select:not(.normal)').each(function() {
                                                                                                            $(this).select2({
                                                                                                                dropdownParent: $(this)
                                                                                                                    .parent()
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                </script>
                                                                                            <?php } ?>
                                                                                        <?php } ?>
                                                                                    <?php } else if ($transpo['jemput'] == 2) { ?>
                                                                                        <?php foreach ($transportasi_antar_jemput1 as $trj => $transpoj) { ?>
                                                                                            <?php if ($transpoj['id_trans'] == $transpo['id_trans']) { ?>
                                                                                                <div class="mb-1">
                                                                                                    User:
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input disabled type="text" class="form-control" name="atas_nama" id="atas_nama" value="<?php echo(isset($user1)) ? $user1 : $transpoj['atas_nama'];?>">
                                                                                                </div>
                                                                                                <div class="mb-1">
                                                                                                    Siap Di:
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input disabled type="text" class="form-control" name="siap_di" id="siap_di" value="<?php echo(isset($siap_di1)) ? $siap_di1 : $transpoj['siap_di'];?>">
                                                                                                </div>
                                                                                                <div class="mb-1">
                                                                                                    Jam:
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input disabled type="text" class="form-control" name="jam_siap_hidden" id="jam_siap_hidden" value="<?php echo(isset($jam_siap_hidden1)) ? $jam_siap_hidden1 : $transpoj['jam_siap'];?>">
                                                                                                    <input hidden type="text" class="form-control" name="jam_siap" id="jam_siap" value="<?php echo(isset($jam_siap1)) ? $jam_siap1 : $transpoj['jam_siap'];?>">
                                                                                                    <input hidden type="text" class="form-control" name="tanggal_mobil" id="tanggal_mobil" value="<?php echo(isset($tanggal_mobil1)) ? $tanggal_mobil1 : $transpoj['tanggal_mobil'];?>">
                                                                                            <input hidden type="text" class="form-control" name="tujuan_mobil" id="tujuan_mobil" value="<?php echo(isset($tujuan_mobil1)) ? $tujuan_mobil1 : $transpoj['tujuan_mobil'];?>">
                                                                                                    <input hidden type="text" class="form-control" name="id_pool" id="id_pool" value="<?php echo(isset($id_pool1)) ? $id_pool1 : $transpoj['id_pool'];?>">
                                                                                                </div>
                                                                                                <div class="mb-1">
                                                                                                    Durasi (Menit):
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input required type="number" min="0" class="form-control" name="durasi" id="durasi">
                                                                                                </div>
                                                                                                <div class="mb-1 mt-3">
                                                                                                    Driver
                                                                                                </div>
                                                                                                <select class="select_pengemudi" name="nama_pengemudi" style="width: 100%;"></select>
                                                                                                <script>
                                                                                                    $(document).ready(function() {
                                                                                                        var pengemudi = [
                                                                                                            <?php foreach ($pengemudi as $penge) : ?>"<?php echo $penge['nama_pengemudi']?>",<?php endforeach ?>
                                                                                                        ]

                                                                                                        $(".select_pengemudi").select2({
                                                                                                            data: pengemudi,
                                                                                                            // tags: true,
                                                                                                            // tokenSeparators: [',', ' '],
                                                                                                        });

                                                                                                        $('select:not(.normal)').each(function() {
                                                                                                            $(this).select2({
                                                                                                                dropdownParent: $(this)
                                                                                                                    .parent()
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                </script>
                                                                                                <div class="mb-1 mt-3">
                                                                                                    Mobil
                                                                                                </div>
                                                                                                <select class="select_mobil" name="nama_mobil" style="width: 100%;"></select>
                                                                                                <script>
                                                                                                    $(document).ready(function() {
                                                                                                        var mobil = [
                                                                                                            <?php foreach ($mobil_pengemudi as $mob_penge) : ?>"<?php echo $mob_penge['nama_mobil']?>",<?php endforeach ?>
                                                                                                        ]

                                                                                                        $(".select_mobil").select2({
                                                                                                            data: mobil,
                                                                                                            // tags: true,
                                                                                                            // tokenSeparators: [',', ' '],
                                                                                                        });

                                                                                                        $('select:not(.normal)').each(function() {
                                                                                                            $(this).select2({
                                                                                                                dropdownParent: $(this)
                                                                                                                    .parent()
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                </script>
                                                                                            <?php } ?>
                                                                                        <?php } ?>
                                                                                        <?php foreach ($transportasi_antar_jemput2 as $trj2 => $transpoj2) { ?>
                                                                                            <?php if ($transpoj2['id_trans'] == $transpo['id_trans']) { ?>
                                                                                                <div class="mb-1">
                                                                                                    User:
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input disabled type="text" class="form-control" name="atas_nama" id="atas_nama" value="<?php echo(isset($user1)) ? $user1 : $transpoj2['atas_nama'];?>">
                                                                                                </div>
                                                                                                <div class="mb-1">
                                                                                                    Siap Di:
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input disabled type="text" class="form-control" name="siap_di" id="siap_di" value="<?php echo(isset($siap_di1)) ? $siap_di1 : $transpoj2['siap_di'];?>">
                                                                                                </div>
                                                                                                <div class="mb-1">
                                                                                                    Jam:
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input disabled type="text" class="form-control" name="jam_siap_hidden" id="jam_siap_hidden" value="<?php echo(isset($jam_siap_hidden1)) ? $jam_siap_hidden1 : $transpoj2['jam_siap'];?>">
                                                                                                    <input hidden type="text" class="form-control" name="jam_siap" id="jam_siap" value="<?php echo(isset($jam_siap1)) ? $jam_siap1 : $transpoj2['jam_siap'];?>">
                                                                                                    <input hidden type="text" class="form-control" name="tanggal_mobil" id="tanggal_mobil" value="<?php echo(isset($tanggal_mobil1)) ? $tanggal_mobil1 : $transpoj2['tanggal_mobil'];?>">
                                                                                            <input hidden type="text" class="form-control" name="tujuan_mobil" id="tujuan_mobil" value="<?php echo(isset($tujuan_mobil1)) ? $tujuan_mobil1 : $transpoj2['tujuan_mobil'];?>">
                                                                                                    <input hidden type="text" class="form-control" name="id_pool" id="id_pool" value="<?php echo(isset($id_pool1)) ? $id_pool1 : $transpoj2['id_pool'];?>">
                                                                                                </div>
                                                                                                <div class="mb-1">
                                                                                                    Durasi (Menit):
                                                                                                </div>
                                                                                                <div class="mb-3">
                                                                                                    <input required type="number" min="0" class="form-control" name="durasi" id="durasi">
                                                                                                </div>
                                                                                                <div class="mb-1 mt-3">
                                                                                                    Driver
                                                                                                </div>
                                                                                                <select class="select_pengemudi" name="nama_pengemudi" style="width: 100%;"></select>
                                                                                                <script>
                                                                                                    $(document).ready(function() {
                                                                                                        var pengemudi = [
                                                                                                            <?php foreach ($pengemudi as $penge) : ?>"<?php echo $penge['nama_pengemudi']?>",<?php endforeach ?>
                                                                                                        ]

                                                                                                        $(".select_pengemudi").select2({
                                                                                                            data: pengemudi,
                                                                                                            // tags: true,
                                                                                                            // tokenSeparators: [',', ' '],
                                                                                                        });

                                                                                                        $('select:not(.normal)').each(function() {
                                                                                                            $(this).select2({
                                                                                                                dropdownParent: $(this)
                                                                                                                    .parent()
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                </script>
                                                                                                <div class="mb-1 mt-3">
                                                                                                    Mobil
                                                                                                </div>
                                                                                                <select class="select_mobil" name="nama_mobil" style="width: 100%;"></select>
                                                                                                <script>
                                                                                                    $(document).ready(function() {
                                                                                                        var mobil = [
                                                                                                            <?php foreach ($mobil_pengemudi as $mob_penge) : ?>"<?php echo $mob_penge['nama_mobil']?>",<?php endforeach ?>
                                                                                                        ]

                                                                                                        $(".select_mobil").select2({
                                                                                                            data: mobil,
                                                                                                            // tags: true,
                                                                                                            // tokenSeparators: [',', ' '],
                                                                                                        });

                                                                                                        $('select:not(.normal)').each(function() {
                                                                                                            $(this).select2({
                                                                                                                dropdownParent: $(this)
                                                                                                                    .parent()
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                </script>
                                                                                            <?php } ?>
                                                                                        <?php } ?>
                                                                                    <?php } ?>
                                                                                <?php } ?>
                                                                            <?php } ?>
                                                                        <?php } ?>
                                                                    <?php } ?>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button class="btn btn-success btn-lg" type="submit" name="save" style="font-size:120%">Set Driver</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal" id="show_driver" tabindex="-1" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h2 class="modal-title" id="modalTopTitle">Detail Driver</h2>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="tab-content">
                                                            <div class="tab-pane active show" style="font-size:120%; text-align: center;">
                                                                <form action="" method="post" enctype="multipart/form-data">
                                                                    <div class="table-responsive text-nowrap">
                                                                        <table class="text-center" style="width: 100%;">
                                                                            <tbody>
                                                                                <?php foreach ($trans as $t => $tra) {?>
                                                                                    <?php if ($tra['batal'] < 2) { ?>
                                                                                        <?php foreach ($transportasi_antar as $tr => $transpo) { ?>
                                                                                            <?php if ($transpo['id_trans'] == $tra['id_trans']) { ?>
                                                                                                <?php if ($transpo['jemput'] == 0) { ?>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Siap di: <?php echo $transpo['siap_di']; ?></th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tujuan ke: <?php echo $transpo['tujuan_mobil']; ?></th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Atas Nama: <?php echo $transpo['atas_nama']; ?> <?php echo "(" ?><?php echo $transpo['jabatan']; ?><?php echo ")" ?></th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php 
                                                                                                            if($transpo['jenis_kendaraan'] == 's'){
                                                                                                                $jenis_kendaraan = 'Sedan';
                                                                                                            } else if($transpo['jenis_kendaraan'] == 'a'){
                                                                                                                $jenis_kendaraan = 'Station';
                                                                                                            } else if($transpo['jenis_kendaraan'] == 'p'){
                                                                                                                $jenis_kendaraan = 'Pick Up';
                                                                                                            } else if($transpo['jenis_kendaraan'] == 'b'){
                                                                                                                $jenis_kendaraan = 'Box';
                                                                                                            } else if($transpo['jenis_kendaraan'] == 't'){
                                                                                                                $jenis_kendaraan = 'Truck';
                                                                                                            }
                                                                                                            ?>
                                                                                                            Jenis Kendaraan: <?php echo $jenis_kendaraan ?>
                                                                                                        </th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jumlah: <?php echo $transpo['jumlah_mobil']; ?></th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Kapasitas: <?php echo $transpo['kapasitas']; ?></th>
                                                                                                    </tr>
                                                                                                    <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                        <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Keterangan: <?php echo $transpo['keterangan_mobil']; ?></th>
                                                                                                    </tr>
                                                                                                <?php } else if ($transpo['jemput'] == 1) { ?>
                                                                                                    <?php foreach ($transportasi_jemput as $traj => $transpoaj) { ?>
                                                                                                        <?php if ($transpoaj['id_trans'] == $transpo['id_trans']) { ?>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Siap di: <?php echo $transpoaj['siap_di']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tujuan ke: <?php echo $transpoaj['tujuan_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Atas Nama: <?php echo $transpoaj['atas_nama']; ?> <?php echo "(" ?><?php echo $transpoaj['jabatan']; ?><?php echo ")" ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php 
                                                                                                                    if($transpoaj['jenis_kendaraan'] == 's'){
                                                                                                                        $jenis_kendaraan = 'Sedan';
                                                                                                                    } else if($transpoaj['jenis_kendaraan'] == 'a'){
                                                                                                                        $jenis_kendaraan = 'Station';
                                                                                                                    } else if($transpoaj['jenis_kendaraan'] == 'p'){
                                                                                                                        $jenis_kendaraan = 'Pick Up';
                                                                                                                    } else if($transpoaj['jenis_kendaraan'] == 'b'){
                                                                                                                        $jenis_kendaraan = 'Box';
                                                                                                                    } else if($transpoaj['jenis_kendaraan'] == 't'){
                                                                                                                        $jenis_kendaraan = 'Truck';
                                                                                                                    }
                                                                                                                    ?>
                                                                                                                    Jenis Kendaraan: <?php echo $jenis_kendaraan ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jumlah: <?php echo $transpoaj['jumlah_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Kapasitas: <?php echo $transpoaj['kapasitas']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Keterangan: <?php echo $transpoaj['keterangan_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                        <?php } ?>
                                                                                                    <?php } ?>
                                                                                                <?php } else if ($transpo['jemput'] == 2) { ?>
                                                                                                    <?php foreach ($transportasi_antar_jemput1 as $trj => $transpoj) { ?>
                                                                                                        <?php if ($transpoj['id_trans'] == $transpo['id_trans']) { ?>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Siap di: <?php echo $transpoj['siap_di']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tujuan ke: <?php echo $transpoj['tujuan_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Atas Nama: <?php echo $transpoj['atas_nama']; ?> <?php echo "(" ?><?php echo $transpoj['jabatan']; ?><?php echo ")" ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php 
                                                                                                                    if($transpoj['jenis_kendaraan'] == 's'){
                                                                                                                        $jenis_kendaraan = 'Sedan';
                                                                                                                    } else if($transpoj['jenis_kendaraan'] == 'a'){
                                                                                                                        $jenis_kendaraan = 'Station';
                                                                                                                    } else if($transpoj['jenis_kendaraan'] == 'p'){
                                                                                                                        $jenis_kendaraan = 'Pick Up';
                                                                                                                    } else if($transpoj['jenis_kendaraan'] == 'b'){
                                                                                                                        $jenis_kendaraan = 'Box';
                                                                                                                    } else if($transpoj['jenis_kendaraan'] == 't'){
                                                                                                                        $jenis_kendaraan = 'Truck';
                                                                                                                    }
                                                                                                                    ?>
                                                                                                                    Jenis Kendaraan: <?php echo $jenis_kendaraan ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jumlah: <?php echo $transpoj['jumlah_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Kapasitas: <?php echo $transpoj['kapasitas']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Keterangan: <?php echo $transpoj['keterangan_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                        <?php } ?>
                                                                                                    <?php } ?>
                                                                                                    <?php foreach ($transportasi_antar_jemput2 as $trj2 => $transpoj2) { ?>
                                                                                                        <?php if ($transpoj2['id_trans'] == $transpo['id_trans']) { ?>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Siap di: <?php echo $transpoj2['siap_di']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Tujuan ke: <?php echo $transpoj2['tujuan_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Atas Nama: <?php echo $transpoj2['atas_nama']; ?> <?php echo "(" ?><?php echo $transpoj2['jabatan']; ?><?php echo ")" ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;"><?php 
                                                                                                                    if($transpoj2['jenis_kendaraan'] == 's'){
                                                                                                                        $jenis_kendaraan = 'Sedan';
                                                                                                                    } else if($transpoj2['jenis_kendaraan'] == 'a'){
                                                                                                                        $jenis_kendaraan = 'Station';
                                                                                                                    } else if($transpoj2['jenis_kendaraan'] == 'p'){
                                                                                                                        $jenis_kendaraan = 'Pick Up';
                                                                                                                    } else if($transpoj2['jenis_kendaraan'] == 'b'){
                                                                                                                        $jenis_kendaraan = 'Box';
                                                                                                                    } else if($transpoj2['jenis_kendaraan'] == 't'){
                                                                                                                        $jenis_kendaraan = 'Truck';
                                                                                                                    }
                                                                                                                    ?>
                                                                                                                    Jenis Kendaraan: <?php echo $jenis_kendaraan ?>
                                                                                                                </th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Jumlah: <?php echo $transpoj2['jumlah_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Kapasitas: <?php echo $transpoj2['kapasitas']; ?></th>
                                                                                                            </tr>
                                                                                                            <tr style="border: 3px solid #03c3ec; text-align: center; padding: 8px;">
                                                                                                                <th colspan ="2" style="border: 3px solid #03c3ec; text-align: left; padding: 8px;">Keterangan: <?php echo $transpoj2['keterangan_mobil']; ?></th>
                                                                                                            </tr>
                                                                                                        <?php } ?>
                                                                                                    <?php } ?>
                                                                                                <?php } ?>
                                                                                            <?php } ?>
                                                                                        <?php } ?>
                                                                                    <?php } ?>
                                                                                <?php } ?>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>