<?php
namespace App\Controllers\Admin;

date_default_timezone_set("Asia/Jakarta");

use App\Controllers\BaseController;
use App\Models\TransaksiModel;
use App\Models\Detail_Pengguna_Model;
use App\Models\PenggunaModel;
use App\Models\EmailDelegasiModel;
use App\Models\BagianModel;
use App\Models\MessModel;
use App\Models\PengemudiModel;
use App\Models\TransModel;
use App\Models\TiketModel;
use App\Models\AkomodasiModel;
use App\Models\TransportasiModel;
use App\Models\TransportasiJemputModel;
use App\Models\ETiketModel;
use App\Models\EAkomodasiModel;
use App\Models\ETransportasiModel;

class Admin extends BaseController
{
    public function __construct()
    {
        $this->validation = \Config\Services::validation();
        $session = \Config\Services::session();
        
        $this->m_id = new TransaksiModel();
        $this->m_detail_pengguna = new Detail_Pengguna_Model();
        $this->m_pengguna = new PenggunaModel();
        $this->m_email_delegasi = new EmailDelegasiModel();
        $this->m_bagian = new BagianModel();
        $this->m_mess = new MessModel();
        $this->m_pengemudi = new PengemudiModel();
        $this->m_trans = new TransModel();
        $this->m_tiket = new TiketModel();
        $this->m_akomodasi = new AkomodasiModel();
        $this->m_transportasi = new TransportasiModel();
        $this->m_transportasi_jemput = new TransportasiJemputModel();
        $this->m_e_tiket = new ETiketModel();
        $this->m_e_akomodasi = new EAkomodasiModel();
        $this->m_e_transportasi = new ETransportasiModel();

        $this->validation = \Config\Services::validation();
        helper("cookie");//remember password, password disimpan di cookie
        helper("global_fungsi_helper");//kirim email di bagian APP/Helper
        helper('url');
    }

    public function userguide()
    {
        echo view("admin/v_userguide");
    }

    public function user()
    {
        return $this->response->download('./dokuserguide/User Guide Program Perjalanan Dinas Luar Negeri (User Bagian).pdf', null);
    }

    public function admin_gs()
    {
        return $this->response->download('./dokuserguide/User Guide Program Perjalanan Dinas Luar Negeri (General Service).pdf', null);
    }

    public function checkAuth($username, $password)
    {
        //use LDAP to check email & password
        $ldapserver = 'ipa.konimex.com';
        $ldapuser = 'cn=directory manager';
        $ldappass = 'd0ra3m0n';
        $ldaptree  = "cn=users,cn=accounts,dc=konimex,dc=com";
        $ldapfilter = "mail=".$username;
        $ldapattr = array("uid");
        $ldapconn = ldap_connect($ldapserver) or die("Could not connect to LDAP server.");
        if ($ldapconn) {
            $ldapbind = ldap_bind($ldapconn, $ldapuser, $ldappass) or die ("Error trying to bind: ".ldap_error($ldapconn));
            if ($ldapbind) {
                $result = ldap_search($ldapconn, $ldaptree, $ldapfilter, $ldapattr) or die ("Error in search query: ".ldap_error($ldapconn));
                $data = ldap_get_entries($ldapconn, $result);
                if(!empty($data[0]["uid"][0])){ // kasih if empty
                    $uiduser = $data[0]["uid"][0];
                    $ldapuserlogin = 'uid='.$uiduser.",".$ldaptree;
                    $checkpass = @ldap_bind($ldapconn, $ldapuserlogin, $password);
                    if ($checkpass)
                        return true;
                    else
                        return false;
                } else
                    return false;
            } else
                return false;
        }
        else
            return false;
    }
    
    public function pre_login()
    {
        $data = [];

        if (session()->get('login_by')) {
            return redirect()->to("post_login");
        }

        if($this->request->getMethod()=='post') {
            $rules = [
                'email'=>[
                    'rules'=>'required',
                    'errors'=>[
                        'required'=>'Email tidak boleh kosong'
                    ]
                ]
            ];
            if(!$this->validate($rules)) {
                session()->setFlashdata("warning", $this->validation->getErrors());
                //return redirect()->to("admin/admin/login");
                return redirect()->to("");
            }

            $email = $this->request->getVar('email');//email pengguna

            $cek_email = $this->m_pengguna->where('email_pengguna', $email)->select('nama_pengguna, email_pengguna')->findAll();

            if ($email == 'super@user') {
                $akun = [
                    'login_email' => $email,
                    'login_by' => 'Administrator',
                ];
                session()->set($akun);
                return redirect()->to("post_login");
            } else if (empty($cek_email)) {
                session()->setFlashdata('warning', ['Email tidak terdaftar']);
                return redirect()->to('');
            } else {
                $akun = [
                    'login_email' => $email,
                    'login_by' => $cek_email[0]['nama_pengguna'],
                ];
                session()->set($akun);
                session()->setFlashdata("success", "Silahkan pilih username");
                return redirect()->to("post_login");
            }
        }        
        echo view("admin/v_login", $data);
        // echo password_hash("konimex", PASSWORD_DEFAULT);
    }
    
    public function post_login()
    {
        $data = [];

        if (!session()->get('login_by')) {
            return redirect()->to('');
        }

        $timestamp = date('Y-m-d H:i:s');
        $time = (strtotime($timestamp));
        
        $now = date('2024-04-25 16:30:00');
        $time_now = (strtotime($now));

        $email_delegasi = $this->m_email_delegasi->where('email_pengguna', session()->get('login_email'))->where('tanggal_jam_mulai <', $time)->where('tanggal_jam_akhir >', $time)->findAll();

        if (session()->get('login_email') == 'super@user') {
            $cek_email = "superuser";
            if (empty($cek_email1)) {
                $cek_email1 = [];
            } else {
                
            }
        } else {
            if (empty($email_delegasi)) {
                $cek_email = $this->m_pengguna->where('email_pengguna', session()->get('login_email'))->join('detail_pengguna', 'detail_pengguna.id_pengguna = pengguna.id_pengguna', 'left')->select('username')->orderBy('username', 'asc')->findAll();
            } else {
                $cek_email = $this->m_pengguna->where('email_pengguna', session()->get('login_email'))->join('detail_pengguna', 'detail_pengguna.id_pengguna = pengguna.id_pengguna', 'left')->select('username')->orderBy('username', 'asc')->findAll();

                $cek_email1 = $this->m_email_delegasi->where('email_pengguna', session()->get('login_email'))->where('tanggal_jam_mulai <', $time)->where('tanggal_jam_akhir >', $time)->select('username')->groupBy('username')->orderBy('username', 'asc')->findAll();
            }
            asort($cek_email);
            if (empty($cek_email1)) {
                $cek_email1 = [];
            } else {
                asort($cek_email1);
            }
        }

        if($this->request->getMethod()=='post') {
            $rules = [
                'username'=>[
                    'rules'=>'required',
                    'errors'=>[
                        'required'=>'Username tidak boleh kosong'
                    ]
                ],
                'email'=>[
                    'rules'=>'required',
                    'errors'=>[
                        'required'=>'Email tidak boleh kosong'
                    ]
                ],
                'password'=>[
                    'rules'=> 'required',
                    'errors'=>[
                        'required'=>'Password tidak boleh kosong'
                    ]
                ]
            ];
            if(!$this->validate($rules)) {
                session()->setFlashdata("warning", $this->validation->getErrors());
                //return redirect()->to("admin/admin/login");
                return redirect()->to("post_login");
            }

            $username = $this->request->getVar('username');//username pengguna
            $email = $this->request->getVar('email');//email pengguna
            $password = $this->request->getVar('password');//dari isian pengguna misal "123123";

            //Cek id_pengguna
            $id_pengguna_arr = $this->m_detail_pengguna->where('username', $username)->select('id_pengguna')->findAll();
            
            $id_pengguna_arr1 = implode(' ', array_map(function ($entry) {
                return ($entry[key($entry)]);
            }, $id_pengguna_arr));

            $id_pengguna_arr2 = explode(' ', $id_pengguna_arr1);
            $id_pengguna_arr3 = array_unique($id_pengguna_arr2);

            $id_pengguna_arr4 = array_values($id_pengguna_arr3);

            $id_detail_pengguna_arr = $this->m_detail_pengguna->where('username', $username)->select('id_detail_pengguna')->findAll();
            
            $id_detail_pengguna_arr1 = implode(' ', array_map(function ($entry) {
                return ($entry[key($entry)]);
            }, $id_detail_pengguna_arr));

            $id_detail_pengguna_arr2 = explode(' ', $id_detail_pengguna_arr1);
            $id_detail_pengguna_arr3 = array_unique($id_detail_pengguna_arr2);

            $id_detail_pengguna = array_values($id_detail_pengguna_arr3);

            if($username == 'superuser' && $email == 'super@user' && password_verify($password, PASS_SUPER)) {
                $akun = [
                    'email_pengguna'=>'superuser',
                ];
                session()->set($akun);
                return redirect()->to("superuser");
            } else if(empty($id_pengguna_arr)) {
                session()->setFlashdata('warning', ['Username belum terdaftar']);
                return redirect()->to("post_login");
            } else if(!empty($id_pengguna_arr)){
                // $check = $this->checkAuth($email, $password);
                // if($check){
                //     //masukkin sini semua
                // } else {
                //     $arr[]="Email atau Password salah.";
                //     session()->setFlashdata('warning', $arr);
                //     return redirect()->to("post_login");
                // }

                foreach ($id_pengguna_arr4 as $key => $value) {
                    $cek_id_pengguna = $this->m_pengguna->where('id_pengguna', $value)->select('id_pengguna')->findAll();
                    foreach ($cek_id_pengguna as $key => $id_pengguna) {
                        $cek_email_pengguna = $this->m_pengguna->where('pengguna.id_pengguna', $id_pengguna)->join('detail_pengguna', 'detail_pengguna.id_pengguna = pengguna.id_pengguna', 'left')->select('email_pengguna')->first();

                        //Cek pool_user
                        $pool_user_arr = $this->m_detail_pengguna->where('id_pengguna', $id_pengguna)->where('username', $username)->select('id_pool')->findAll();
                    
                        $pool_arr1 = implode(' ', array_map(function ($entry) {
                            return ($entry[key($entry)]);
                        }, $pool_user_arr));

                        $pool_arr2 = explode(' ', $pool_arr1);
                        $pool_arr3 = array_unique($pool_arr2);
                        $pool_arr4 = array_values($pool_arr3);

                        $id_pool = implode(' ', $pool_arr4);

                        //Cek admin_gs
                        $admin_gs = $this->m_detail_pengguna->where('id_pengguna', $id_pengguna)->where('username', $username)->select('admin_gs')->first();

                        //Cek email_pengguna
                        $email_pengguna_arr = $this->m_pengguna->whereIn('id_pengguna', $id_pengguna)->select('email_pengguna')->findAll();

                        $email_arr1 = implode(' ', array_map(function ($entry) {
                            return ($entry[key($entry)]);
                        }, $email_pengguna_arr));

                        $email_arr2 = explode(' ', $email_arr1);
                        $email_arr3 = array_unique($email_arr2);
                        $email_arr4 = array_values($email_arr3);

                        $email_pengguna = implode(' ', $email_arr4);

                        if(empty($email_pengguna)) {
                            session()->setFlashdata('warning', ['Username belum terdaftar']);
                            return redirect()->to("post_login");
                        } else if($email_pengguna == '-') {
                            
                        }

                        //Cek nama_pengguna
                        $nama_pengguna_arr = $this->m_pengguna->whereIn('id_pengguna', $id_pengguna_arr4)->select('nama_pengguna')->findAll();

                        $arr_nama = implode('/', array_map(function ($entry) {
                            return ($entry[key($entry)]);
                        }, $nama_pengguna_arr));

                        if(empty($arr_nama)) {
                            session()->setFlashdata('warning', ['Username belum terdaftar']);
                            return redirect()->to("post_login");
                        }

                        //Cek nik_pengguna
                        $nik_pengguna_arr = $this->m_pengguna->whereIn('id_pengguna', $id_pengguna_arr4)->select('nik_pengguna')->findAll();

                        $nik_pengguna = implode('/', array_map(function ($entry) {
                            return ($entry[key($entry)]);
                        }, $nik_pengguna_arr));

                        if ($admin_gs['admin_gs'] == '0') {
                            $role = "User";
                        } else if ($admin_gs['admin_gs'] == '1') {
                            $role = "Admin GS";
                        } else if ($admin_gs['admin_gs'] == '2') {
                            $role = "Petugas Pool";
                        }

                        //Cek id_bagian
                        $id_bagian = $this->m_detail_pengguna->where('username', $username)->join('bagian', 'bagian.id_bagian = detail_pengguna.id_bagian', 'left')->select('detail_pengguna.id_bagian, nama_bagian')->first();
                        $id_jabatan = $this->m_detail_pengguna->where('username', $username)->join('jabatan', 'jabatan.id_jabatan = detail_pengguna.id_jabatan', 'left')->select('detail_pengguna.id_jabatan, nama_jabatan')->first();

                        //cek login_by
                        $id_pengguna_login = $this->m_email_delegasi->where('username', $username)->where('email_pengguna', session()->get('login_email'))->where('tanggal_jam_mulai <', $time)->where('tanggal_jam_akhir >', $time)->select('id_pengguna')->orderBy('username', 'asc')->findAll();

                        if (empty($id_pengguna_login)) {
                            $login_by = $arr_nama;
                        } else {
                            $nama_pengguna_login = $this->m_pengguna->where('id_pengguna', $id_pengguna_login[0]['id_pengguna'])->select('nama_pengguna')->findAll();
                            $login_by = $nama_pengguna_login[0]['nama_pengguna'];
                        }

                        $akun = [
                            'id_detail_pengguna' => $id_detail_pengguna[0],
                            'id_pengguna' => $id_pengguna['id_pengguna'],
                            'nama_pengguna' => $arr_nama,
                            'username' => $username,
                            'nik_pengguna'=> $nik_pengguna,
                            'email_pengguna'=> $email_pengguna,
                            'pool_pengguna' => $id_pool,
                            'admin_gs' => $admin_gs['admin_gs'],
                            'role' => $role,
                            'id_bagian' => $id_bagian['id_bagian'],
                            'nama_bagian' => $id_bagian['nama_bagian'],
                            'id_jabatan' => $id_jabatan['id_jabatan'],
                            'nama_jabatan' => $id_jabatan['nama_jabatan'],
                            'login_by' => $login_by,
                        ];
                        session()->set($akun);
                        return redirect()->to("sukses");
                    }
                }
            }
        }

        $data = [
            'cek_email' => $cek_email,
            'cek_email1' => $cek_email1,
        ];
        
        echo view("admin/v_login", $data);
        // d(session()->get(''));
        // echo password_hash("konimex", PASSWORD_DEFAULT);
    }

    public function superuser()
    {
        $data[] = '';

        $admin_gs = session()->get('admin_gs');

        if(session()->get('email_pengguna') == 'superuser'){

        } else if(session()->get('email_pengguna') != 'superuser') {
            if($admin_gs == 0){
                return redirect()->to('trans');
            } elseif ($admin_gs == 1) {
                return redirect()->to('dept');
            } elseif ($admin_gs == 2) {
                return redirect()->to('pasjalangs');
            }
        } else {
            return redirect()->to('logout');
        }

        if($this->request->getMethod()=='post') {
            $oke = $this->request->getVar('oke');

            $detail_pengguna = $this->m_detail_pengguna->where('username', $oke)->select('id_detail_pengguna, id_pengguna, id_pool, admin_gs')->first();

            if (empty($detail_pengguna)) {
                session()->setFlashdata('warning', ['Username tidak terdaftar']);
                return redirect()->to("superuser");
            }

            $pengguna = $this->m_pengguna->where('id_pengguna', $detail_pengguna['id_pengguna'])->select('nama_pengguna, nik_pengguna, email_pengguna')->first();

            $id_bagian = $this->m_detail_pengguna->where('username', $oke)->join('bagian', 'bagian.id_bagian = detail_pengguna.id_bagian', 'left')->select('detail_pengguna.id_bagian, nama_bagian')->first();
            
            $id_jabatan = $this->m_detail_pengguna->where('username', $oke)->join('jabatan', 'jabatan.id_jabatan = detail_pengguna.id_jabatan', 'left')->select('detail_pengguna.id_jabatan, nama_jabatan')->first();

            if ($detail_pengguna['admin_gs'] == '0') {
                $role = "User";
            } else if ($detail_pengguna['admin_gs'] == '1') {
                $role = "Admin GS";
            } else if ($detail_pengguna['admin_gs'] == '2') {
                $role = "Petugas Pool";
            }

            $akun = [
                'id_detail_pengguna' => $detail_pengguna['id_detail_pengguna'],
                'id_pengguna' => $detail_pengguna['id_pengguna'],
                'nama_pengguna' => $pengguna['nama_pengguna'],
                'username' => $oke,
                'nik_pengguna'=> $pengguna['nik_pengguna'],
                'email_pengguna'=> $pengguna['email_pengguna'],
                'pool_pengguna' => $detail_pengguna['id_pool'],
                'admin_gs' => $detail_pengguna['admin_gs'],
                'role' => $role,
                'id_bagian' => $id_bagian['id_bagian'],
                'nama_bagian' => $id_bagian['nama_bagian'],
                'id_jabatan' => $id_jabatan['id_jabatan'],
                'nama_jabatan' => $id_jabatan['nama_jabatan'],
                'login_email' => $pengguna['email_pengguna'],
                'login_by' => $pengguna['nama_pengguna'],
            ];
            session()->set($akun);
            return redirect()->to("sukses");
        }
        echo view("admin/v_superuser", $data);
    }

    public function sukses()
    {
        $timestamp = date('Y-m-d H:i:s');
        $time = (strtotime($timestamp));

        $mess = $this->m_mess->join('hotel', 'hotel.id_hotel = mess_kx_jkt.id_hotel', 'left')->join('akomodasi', 'akomodasi.id_hotel = mess_kx_jkt.id_hotel', 'left')->where('nama_kamar', 'mess')->where('status_mess', 1)->select('id_akomodasi, jumlah_kamar, tanggal_jam_keluar, kapasitas_kamar, terpakai')->findAll();
        
        $sum = 0;
        foreach ($mess as $m => $mes) {
            $jam_keluar = (strtotime($mes['tanggal_jam_keluar']));
            
            $sum += $mes['jumlah_kamar'];

            if ($mes['terpakai'] == 0) {
                
            } else {
                if($time == $jam_keluar || $time > $jam_keluar){
                    $terpakai = [
                        'id_mess' => 8,
                        'terpakai' => $mes['terpakai'] - $sum,
                        'edited_at' => $timestamp,
                    ];

                    $akomodasi = [
                        'id_akomodasi' => $mes['id_akomodasi'],
                        'status_mess' => 0,
                    ];
                    $this->m_akomodasi->save($akomodasi);
                }
            }
        }

        if (empty($terpakai)) {
            
        } else {
            $this->m_mess->save($terpakai);
        }

        $eval_tiket_auto = $this->m_tiket->where('tanggal_jam_tiket <', $timestamp)->where('kirim_eval', 0)->where('batal_tiket', 0)->where('status_tiket', 1)->select('id_trans, id_tiket, tanggal_jam_tiket')->findAll();
        
        foreach ($eval_tiket_auto as $eta => $evtik) {
            $tiga_hari = (strtotime($evtik['tanggal_jam_tiket']));

            if ($time - $tiga_hari >= 259200) {
                $id_detail_pengguna = $this->m_trans->where('id_trans', $evtik['id_trans'])->select('id_detail_pengguna')->findAll();

                foreach ($id_detail_pengguna as $idp => $detail_peng) {
                    $record = [
                        'id_trans' => $evtik['id_trans'],
                        'id_tiket' => $evtik['id_tiket'],
                        'id_detail_pengguna' => $detail_peng['id_detail_pengguna'],
                        'a1_nilai' => 3,
                        'b1_nilai' => 3,
                        'c1_nilai' => 3,
                        'd1_nilai' => 3,
                        'komentar' => null,
                        'status' => 1,
                        'tgl_input' => date('Ymd'),
                    ];
        
                    $tiket = [
                        'id_tiket' => $evtik['id_tiket'],
                        'kirim_eval' => 1,
                        'edited_at' => $timestamp,
                    ];
        
                    $this->m_e_tiket->insert($record);
                    $this->m_tiket->save($tiket);
                }
            }
        }

        $eval_akomodasi_auto = $this->m_akomodasi->where('tanggal_jam_keluar <', $timestamp)->where('kirim_eval', 0)->where('batal_akomodasi', 0)->where('status_akomodasi', 1)->select('id_trans, id_akomodasi, tanggal_jam_keluar')->findAll();
        
        foreach ($eval_akomodasi_auto as $eaa => $evak) {
            $tiga_hari = (strtotime($evak['tanggal_jam_keluar']));

            if ($time - $tiga_hari >= 259200) {
                $id_detail_pengguna = $this->m_trans->where('id_trans', $evak['id_trans'])->select('id_detail_pengguna')->findAll();

                foreach ($id_detail_pengguna as $idp => $detail_peng) {
                    $record = [
                        'id_trans' => $evak['id_trans'],
                        'id_akomodasi' => $evak['id_akomodasi'],
                        'id_detail_pengguna' => $detail_peng['id_detail_pengguna'],
                        'a1_nilai' => 3,
                        'b1_nilai' => 3,
                        'c1_nilai' => 3,
                        'd1_nilai' => 3,
                        'e1_nilai' => 3,
                        'f1_nilai' => 3,
                        'g1_nilai' => 3,
                        'a2_nilai' => 3,
                        'b2_nilai' => 3,
                        'c2_nilai' => 3,
                        'd2_nilai' => 3,
                        'komentar' => null,
                        'status' => 1,
                        'tgl_input' => date('Ymd'),
                    ];
        
                    $akomodasi = [
                        'id_akomodasi' => $evak['id_akomodasi'],
                        'kirim_eval' => 1,
                        'edited_at' => $timestamp,
                    ];
        
                    $this->m_e_akomodasi->insert($record);
                    $this->m_akomodasi->save($akomodasi);
                }
            }
        }

        $eval_transportasi_auto = $this->m_transportasi->where('tanggal_mobil <', $timestamp)->where('kirim_eval', 0)->where('batal_transportasi', 0)->where('status_mobil', 1)->select('id_trans, id_transportasi, tanggal_mobil, jam_siap')->findAll();
        
        foreach ($eval_transportasi_auto as $eta => $evtr) {
            $gab_tiga_hari = tanggal_waktu($evtr['tanggal_mobil'], $evtr['jam_siap']);
            $tiga_hari = strtotime($gab_tiga_hari);

            if ($time - $tiga_hari >= 259200) {
                $id_detail_pengguna = $this->m_trans->where('trans.id_trans', $evtr['id_trans'])->join('transportasi', 'transportasi.id_trans = trans.id_trans', 'left')->select('trans.id_detail_pengguna, id_pengemudi')->findAll();

                foreach ($id_detail_pengguna as $idp => $detail_peng) {
                    $record = [
                        'id_trans' => $evtr['id_trans'],
                        'id_transportasi' => $evtr['id_transportasi'],
                        'id_detail_pengguna' => $detail_peng['id_detail_pengguna'],
                        'id_pengemudi' => $detail_peng['id_pengemudi'],
                        'a1_nilai' => 3,
                        'b1_nilai' => 3,
                        'c1_nilai' => 3,
                        'd1_nilai' => 3,
                        'a2_nilai' => 3,
                        'b2_nilai' => 3,
                        'c2_nilai' => 3,
                        'd2_nilai' => 3,
                        'e2_nilai' => 3,
                        'f2_nilai' => null,
                        '3_nilai' => 3,
                        '4_nilai' => 3,
                        'a5_nilai' => 3,
                        'b5_nilai' => 3,
                        'komentar' => null,
                        'status' => 1,
                        'tgl_input' => date('Ymd'),
                    ];
        
                    $transportasi = [
                        'id_transportasi' => $evtr['id_transportasi'],
                        'kirim_eval' => 1,
                        'edited_at' => $timestamp,
                    ];
        
                    $this->m_e_transportasi->insert($record);
                    $this->m_transportasi->save($transportasi);
                }
            }
        }

        // $transportasi = $this->m_transportasi->where('pengemudi.id_pengemudi !=', null)->join('pengemudi', 'pengemudi.id_pengemudi = transportasi.id_pengemudi', 'left')->select('id_transportasi, transportasi.id_pengemudi, id_trans, nama_pengemudi, tanggal_mobil, jam_siap, status')->findAll();
        // foreach ($transportasi as $t => $transpo) {
        //     $tanggal_waktu = tanggal_waktu($transpo['tanggal_mobil'], $transpo['jam_siap']);
        //     $time_tanggal_waktu = (strtotime($tanggal_waktu));
        //     if($time == $time_tanggal_waktu || $time > $time_tanggal_waktu){
        //         $pengemudi = [
        //             'id_pengemudi' => $transpo['id_pengemudi'],
        //             'status' => 0,
        //             'jam_akhir' => $time_tanggal_waktu,
        //             'edited_at' => $timestamp,
        //         ];
        //         $this->m_pengemudi->save($pengemudi);
        //         // echo date("Y-m-d H:i:s", substr("1477020641000", 0, 10));//epoch to timestamp
        //     }
        // }

        $ses_time = [
            'login_at' => $time,
        ];

        session()->set($ses_time);

        $admin_gs = session()->get('admin_gs');
        $login_at = session()->get('login_at');

        $url_kendaraan = session()->get('url_kendaraan');

        if(!session()->get('url_kendaraan')){
            if($admin_gs == 0){
                return redirect()->to('trans');
            } elseif ($admin_gs == 1) {
                return redirect()->to('dept');
            } elseif ($admin_gs == 2) {
                return redirect()->to('pasjalangs');
            }
        } else {
            return redirect()->to(session()->get('url_kendaraan'));
        }

        // d(session()->get(''));
        // echo "ISIAN COOKIE email " .get_cookie("cookie_email"). " DAN PASSWORD ".get_cookie("cookie_password");
    }

    public function logout()
    {
        delete_cookie("cookie_email");
        delete_cookie("cookie_password");
        session()->destroy();
        
        session()->setFlashdata("success", "Anda telah keluar");
        return redirect()->to('');
    }
}