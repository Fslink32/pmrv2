define([
    "jQuery",
    "jQuery-easing",
    "bootstrap",
    "datatablesBootstrap",
    "admin",
    "chart",
    "chart-area",
    "chart-pie",
], function (
    $,
    tabler,
    toastr,
    jValidate,
    datatablesBootstrap,
    select2,
) {
    return {
        table: null,
        kabupaten_selected: $("#kabupaten_selected").val(),
        kecamatan_selected: $("#kecamatan_selected").val(),
        init: function () {
            // App.initFunc();
            // App.initTable();
            // App.initSelect2();
            // App.initTableClick();
            // App.initForm();
            // App.onChangeProvinsi();
            // App.onChangeKabupaten();
        },

        initTable : function(){
            App.table = $('#table').DataTable({
                "bPaginate": true,
                "bLengthChange": true,
                "bFilter": true,
                "bInfo": true,
                "searching": true,
                "responsive": true,
                "language": {
                    "search": "Cari",
                    "lengthMenu": "Lihat _MENU_ data",
                    "zeroRecords": "Tidak ada data yang ditemukan",
                    "info": "Menampilkan _START_ hingga _END_ dari _TOTAL_ data",
                    "infoEmpty": "Tidak ada data di dalam tabel",
                    "infoFiltered": "(cari dari _MAX_ total catatan)",
                    "loadingRecords": "Loading...",
                    "processing": "Processing...",
                    "paginate": {
                        "first": "Pertama",
                        "last": "Terakhir",
                        "next": "Selanjutnya",
                        "previous": "Sebelumnya"
                    },
                },
                "order": [[ 0, "asc" ]], //agar kolom id default di order secara desc
                "processing": true,
                "serverSide": true,
                "ajax":{
                    "url": App.baseUrl+"ppk/dataList",
                    "dataType": "json",
                    "type": "POST"
                },
                "columns": [
                    { "data": "provinsi_name" },
                    { "data": "kabupaten_name" },
                    { "data": "kecamatan_name" },
                    { "data": "name" },
                    { "data": "is_deleted"},
                    { "data": "action" , "orderable": false},
                ],
            });
        },
        initSelect2: function(){
            $("#provinsi_id").select2({
                placeholder: "Pilih Provinsi",
                width: "100%",
            });
            $("#kabupaten_id").select2({
                placeholder: "Pilih Kabupaten/Kota",
                width: "100%",
            });
            $("#kecamatan_id").select2({
                placeholder: "Pilih Kecamatan",
                width: "100%",
            });
        },
        initTableClick: function () {
            $('#table tbody').on('click', '.delete', function () {
                var url = $(this).attr("url");
                var status = $(this).attr("data-status");
                var pesan = "";
                if (status == 1) {
                    pesan = "Apakah anda yakin ingin menonaktifkan data ini?";
                } else if (status == 2) {
                    pesan = "Apakah anda yakin ingin mengaktifkan data ini?";
                } else if (status == 3) {
                    pesan = "Apakah anda yakin ingin menghapus data ini?";
                }
                App.confirm(pesan, function () {
                    $.ajax({
                        method: "GET",
                        url: url
                    }).done(function (msg) {
                        var data = JSON.parse(msg);
                        if (data.status == false) {
                            toastr.error(data.msg);
                        } else {
                            toastr.success(data.msg);
                            App.table.ajax.reload(null, false);
                        }
                    });
                })
            });
        },
        initForm : function(){
            if($("#form").length > 0){
                $("#form").validate({
                    rules: {
                        provinsi_id: {
                            required: true,
                        },
                        kabupaten_id: {
                            required: true,
                        },
                        kecamatan_id: {
                            required: true,
                        },
                        name: {
                            required: true,
                        },
                        alamat: {
                            required: true,
                        },
                        name_sekretaris: {
                            required: true,
                        },
                        nip_sekretaris: {
                            required: true,
                        },
                        jabatan_sekretaris: {
                            required: true,
                        },
                        telepon_sekretaris: {
                            required: true,
                        },
                        alamat_sekretaris: {
                            required: true,
                        },
                        name_staff: {
                            required: true,
                        },
                        nip_staff: {
                            required: true,
                        },
                    },
                    messages: {
                        provinsi_id: {
                            required: "Provinsi Harus Dipilih"
                        },
                        kabupaten_id: {
                            required: "Kabupaten/Kota Harus Dipilih"
                        },
                        kecamatan_id: {
                            required: "Kecamatan Harus Dipilih"
                        },
                        name: {
                            required: "Nama Harus Diisi"
                        },
                        alamat: {
                            required: "Alamat Harus Diisi"
                        },
                        name_sekretaris: {
                            required: "Nama Sekretaris/Ketua Harus Diisi"
                        },
                        nip_sekretaris: {
                            required: "NIP Sekretaris/Ketua Harus Diisi"
                        },
                        jabatan_sekretaris: {
                            required: "Jabatan Harus Diisi"
                        },
                        telepon_sekretaris: {
                            required: "Telepon Harus Diisi"
                        },
                        alamat_sekretaris: {
                            required: "Alamat Sekretaris/Ketua Harus Diisi"
                        },
                        name_staff: {
                            required: "Nama Staf Harus Diisi"
                        },
                        nip_staff: {
                            required: "NIP Staf Harus Diisi"
                        },
                    },
                    debug:true,
                    errorElement: "em",
                    errorPlacement: function ( error, element ) {
                        error.addClass( "invalid-feedback" );
                        console.log( element.prop( "type" ));
                        if ( element.prop( "type" ) === "checkbox" ) {
                            error.insertBefore( element.next( "label" ) );
                        } else if ( element.prop( "type" ) === "radio" ) {
                            error.appendTo( element.parent().parent().parent());
                        } else if ( element.prop( "type" ) === "select-one" ) {
                            error.appendTo( element.parent());
                        } else if ( element.attr( "aria-describedby" ) === "basic-group-left" ) {
                            error.insertBefore( element.parent() );
                        } else {
                            error.insertAfter( element );
                        }
                    },
                    submitHandler : function(form) {
                        form.simpan[0].disabled = true;
                        form.submit();
                        return false;
                    }
                });
            }
        },
        onChangeProvinsi: function () {
            $("#provinsi_id").on('change', function (event) {
                var provinsi_id = $(this).val()
                $.ajax({
                    url: App.baseUrl + 'wilayah/getAllKabupatenByProvinsi',
                    type: 'GET',
                    data: { id: provinsi_id },
                })
                .done(function (response) {
                    var data = JSON.parse(response)
                    var kabupaten_option = "<option value=''>Pilih Kabupaten/Kota</option>";
                    if (data.status == true) {
                        for (var i = 0; i < data.data.length; i++) {
                            if(App.kabupaten_selected == data.data[i].id){
                                kabupaten_option += "<option selected value=" + data.data[i].id + "> " + data.data[i].name + "</option>";
                            }else{
                                kabupaten_option += "<option value=" + data.data[i].id + "> " + data.data[i].name + "</option>";
                            }
                        }
                    }
                    $("#kabupaten_id").html(kabupaten_option);
                    $("#kabupaten_id").trigger("change");
                })
                .fail(function () {
                    console.log("error");
                });
            });

            var provinsi_id = $("#provinsi_id").val();
            if(provinsi_id != undefined && provinsi_id != ""){
                $("#provinsi_id").trigger("change");
            }
        },
        onChangeKabupaten: function () {
            $("#kabupaten_id").on('change', function (event) {
                var kabupaten_id = $(this).val()
                $.ajax({
                    url: App.baseUrl + 'wilayah/getAllKecamatanByKabupaten',
                    type: 'GET',
                    data: { id: kabupaten_id },
                })
                .done(function (response) {
                    var data = JSON.parse(response)
                    var kecamatan_option = "<option value=''>Pilih Kecamatan</option>";

                    if (data.status == true) {
                        for (var i = 0; i < data.data.length; i++) {
                            if(App.kecamatan_selected == data.data[i].id){
                                kecamatan_option += "<option selected value=" + data.data[i].id + "> " + data.data[i].name + "</option>";
                            }else{
                                kecamatan_option += "<option value=" + data.data[i].id + "> " + data.data[i].name + "</option>";
                            }
                        }
                    }
                    $("#kecamatan_id").html(kecamatan_option);
                    $("#kecamatan_id").trigger("change");
                })
                .fail(function () {
                    console.log("error");
                });

            });
        },
    }
});
