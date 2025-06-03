<ul class="menu-inner py-1">
    <?php
        $dept = site_url("dept");
        $negara = site_url("negara");
        $vendo = site_url("vendo");
        $hotel = site_url("hotel");
        $mobil = site_url("mobil");
        $pengemudi = site_url("pengemudi");
        $pengguna = site_url("pengguna");
        $pool = site_url("pool");
        $tujuan = site_url("tujuan");
        $jam_kend = site_url("jam_kend");
        $jam_driv = site_url("jam_driv");
        $warning = site_url("warning");
    ?>
    <li class="menu-item">
        <a style="font-size: 200%" href="javascript:void(0);" class="menu-link menu-toggle">
            <i class="fa-solid fa-database" style="margin-left: 12px"></i>
            <div data-i18n="Layouts" style="margin-left: 12px">Master</div>
        </a>

        <ul class="menu-sub">
            <a style="font-size: 150%" href="<?php echo $dept; ?>" class="menu-link">
                <i class="fa-brands fa-black-tie"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Bagian - Jabatan</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $negara; ?>" class="menu-link">
                <i class="fa-regular fa-flag"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Negara - Kota</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $vendo; ?>" class="menu-link">
                <i class="fa-solid fa-code-merge"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Vendor</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $hotel; ?>" class="menu-link">
                <i class="fa-solid fa-hotel"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Hotel</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $mobil; ?>" class="menu-link">
                <i class="fa-solid fa-car"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Mobil</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $pengemudi; ?>" class="menu-link">
                <i class="fa-solid fa-face-smile"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Pengemudi</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $pengguna; ?>" class="menu-link">
                <i class="fa-regular fa-user"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Pengguna</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $pool; ?>" class="menu-link">
                <i class="fa-brands fa-slack"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Pool</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $tujuan; ?>" class="menu-link">
                <i class="fa-solid fa-location-dot"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Tujuan</div>
            </a>
            <!-- <a style="font-size: 150%" href="<php echo $jam_kend; ?>" class="menu-link">
                <i class="fa-solid fa-clock"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Jam Tersedia Kendaraan</div>
            </a>
            <a style="font-size: 150%" href="<php echo $jam_driv; ?>" class="menu-link">
                <i class="fa-regular fa-clock"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Jam Tersedia Pengemudi</div>
            </a>
            <a style="font-size: 150%" href="<php echo $warning; ?>" class="menu-link">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Warning</div>
            </a> -->
        </ul>
    </li>

    <?php
        $tiket_admin = site_url("tiket_admin");
        $akomodasi_admin = site_url("akomodasi_admin");
        $transport_admin = site_url("transport_admin");
        $mess_admin = site_url("mess_admin");
        $tele = site_url("tele");
        $cetak_pas = site_url("cetak_pas");
        $arsip_tiket = site_url("arsip_tiket");
        $arsip_akomodasi = site_url("arsip_akomodasi");
        $arsip_transport = site_url("arsip_transport");
        $bbm = site_url("bbm");
        $daftar_pakai_kend = site_url("daftar_pakai_kend");
        $set_pas = site_url("set_pas");

        $id_pool = session()->get('pool_pengguna');
    ?>

    <li class="menu-item active">
        <a style="font-size: 200%" href="javascript:void(0);" class="menu-link menu-toggle">
            <i class="fa-solid fa-handshake"></i>
            <div data-i18n="Analytics" style="margin-left: 12px">Transaksi Admin</div>
        </a>

        <ul class="menu-sub">
            <a style="font-size: 150%" href="<?php echo $tiket_admin; ?>" class="menu-link">
                <i class="fa-solid fa-ticket"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Tiket</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $akomodasi_admin; ?>" class="menu-link">
                <i class="fa-solid fa-hotel"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Akomodasi</div>
            </a>
            <?php if ($id_pool == 2) { ?>
                <a style="font-size: 150%" href="<?php echo $mess_admin; ?>" class="menu-link">
                    <i class="fa-solid fa-hotel"></i>
                    <div data-i18n="Without menu" style="margin-left: 12px">Mess Kx Jkt</div>
                </a>
            <?php } else { ?>

            <?php } ?>
            <a style="font-size: 150%" href="<?php echo $transport_admin; ?>" class="menu-link">
                <i class="fa-solid fa-car"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Transport</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $tele; ?>" class="menu-link">
                <i class="fa-brands fa-telegram"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Kirim Pesan via Telegram</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $cetak_pas; ?>" class="menu-link">
                <i class="fa-solid fa-file"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Cetak Pas Jalan</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $arsip_tiket; ?>" class="menu-link">
                <i class="fa-solid fa-ticket-simple"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Arsip Permintaan Tiket</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $arsip_akomodasi; ?>" class="menu-link">
                <i class="fa-solid fa-building"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Arsip Permintaan Akomodasi</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $arsip_transport; ?>" class="menu-link">
                <i class="fa-solid fa-car-side"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Arsip Permintaan Transport</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $bbm; ?>" class="menu-link">
                <i class="fa-solid fa-gas-pump"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Pengunaan BBM</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $daftar_pakai_kend; ?>" class="menu-link">
                <i class="fa-solid fa-list"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Daftar Pakai Kendaraan</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $set_pas; ?>" class="menu-link">
                <i class="fa-regular fa-clock"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Set Jam Manual Pas Jalan</div>
            </a>
        </ul>
    </li>

    <?php
        $eval_jasa_tiket = site_url("eval_jasa_tiket");
        $eval_jasa_akomodasi = site_url("eval_jasa_akomodasi");
        $eval_jasa_transport = site_url("eval_jasa_transport");
        $eval_lain = site_url("eval_lain");
    ?>

    <li class="menu-item">
        <a style="font-size: 200%" href="javascript:void(0);" class="menu-link menu-toggle">
            <i class="fa-solid fa-file-pdf" style="margin-left: 12px"></i>
            <div data-i18n="Layouts" style="margin-left: 12px">Laporan</div>
        </a>

        <ul class="menu-sub">
            <a style="font-size: 150%" href="<?php echo $eval_jasa_tiket; ?>" class="menu-link">
                <i class="fa-solid fa-ticket"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Evaluasi Jasa Tiket</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $eval_jasa_akomodasi; ?>" class="menu-link">
                <i class="fa-solid fa-hotel"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Evaluasi Jasa Akomodasi</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $eval_jasa_transport; ?>" class="menu-link">
                <i class="fa-solid fa-car"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Evaluasi Jasa Transport</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $eval_lain; ?>" class="menu-link">
                <i class="fa-solid fa-file-circle-question"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Lainnya</div>
            </a>
        </ul>
    </li>
</ul>
</aside>
<!-- / Menu -->

<!-- Layout container -->
<div class="layout-page">
    <!-- Navbar -->

    <nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar">
        <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
            <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i class="fa-solid fa-list" style="font-size: 30px;"></i>
            </a>
        </div>

        <div class="navbar-nav-right d-flex align-items-center ms-auto" id="navbar-collapse">
            <div class="navbar-nav align-items-center">
                <div class="nav-item d-flex align-items-center">
                    <span style="font-size:24px;"><strong><?php echo session()->get('nama_pengguna');?> (<?php echo session()->get('role');?>)</strong></span>
                </div>
            </div>
            <ul class="navbar-nav flex-row align-items-center ms-auto">
                <!-- User -->
                <li class="nav-item navbar-dropdown dropdown-user dropdown">
                    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#logout"
                        style="font-size:100%;">
                        <i class="fa-solid fa-power-off"></i> Logout
                    </button>
                </li>
            </ul>
        </div>
    </nav>