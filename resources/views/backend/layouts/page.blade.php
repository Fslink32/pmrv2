@include('backend.layouts.header')
@include('backend.layouts.sidebar')
@include('backend.layouts.topbar')
<!-- Begin Page Content -->
<div class="container-fluid">

    @section('content')
    @show

</div>
<!-- /.container-fluid -->

</div>
<!-- End of Main Content -->

<!-- Footer -->
<footer class="sticky-footer bg-white">
    <div class="container my-auto">
        <div class="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2021</span>
        </div>
    </div>
</footer>
<!-- End of Footer -->

</div>
<!-- End of Content Wrapper -->

</div>
<!-- End of Page Wrapper -->
<script data-main="<?= url('/') ?>/assets/js/main/main-dashboard" src="<?= url('/') ?>/assets/js/require.js"></script>

@include('backend.layouts.footer')
<input type="hidden" id="base_url" value="<?= url('/') ?>/">
</body>

</html>
