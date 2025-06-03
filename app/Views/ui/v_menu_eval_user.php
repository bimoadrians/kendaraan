<ul class="menu-inner py-1">
    <?php
        $hotel = site_url("hotel_user");
    ?>
    <li class="menu-item">
        <a style="font-size: 200%" href="<?php echo $hotel; ?>" class="menu-link">
            <i class="fa-solid fa-hotel"></i>
            <div data-i18n="Analytics" style="margin-left: 12px">Daftar Hotel</div>
        </a>
    </li>

    <?php
        $trans = site_url("trans");
    ?>

    <li class="menu-item">
        <a style="font-size: 200%" href="<?php echo $trans; ?>" class="menu-link">
            <i class="fa-solid fa-handshake"></i>
            <div data-i18n="Analytics" style="margin-left: 12px">Transaksi</div>
        </a>
    </li>

    <?php
        $eval_tiket_user = site_url("eval_tiket_user");
        $eval_akomodasi_user = site_url("eval_akomodasi_user");
        $eval_transport_user = site_url("eval_transport_user");
    ?>

    <li class="menu-item active">
        <a style="font-size: 200%" href="javascript:void(0);" class="menu-link menu-toggle">
            <i class="fa-solid fa-book" style="margin-left: 12px"></i>
            <div data-i18n="Layouts" style="margin-left: 12px">Evaluasi</div>
        </a>

        <ul class="menu-sub">
            <a style="font-size: 150%" href="<?php echo $eval_tiket_user; ?>" class="menu-link">
                <i class="fa-solid fa-ticket"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Tiket</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $eval_akomodasi_user; ?>" class="menu-link">
                <i class="fa-solid fa-hotel"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Akomodasi</div>
            </a>
            <a style="font-size: 150%" href="<?php echo $eval_transport_user; ?>" class="menu-link">
                <i class="fa-solid fa-car"></i>
                <div data-i18n="Without menu" style="margin-left: 12px">Transport</div>
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