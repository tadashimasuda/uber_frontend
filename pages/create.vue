<template>
    <div class="container col-10">
        <div class="post border mt-5 mx-auto col-md-4" style="height:150px">
        </div>
        <div class="col-md-5 border mx-auto mt-2">
            <form @submit.prevent="submit">
                <div class="form-group ">
                    <label>エリア</label>
                    <input type="text" class="form-control">
                    <small class="form-text text-danger"></small>
                </div>
                <div class="form-group ">
                    <label>配達件数</label>
                    <input type="text" class="form-control">
                    <small class="form-text text-danger"></small>
                </div>
                <div class="form-group ">
                    <label>報酬金額</label>
                    <input type="text" class="form-control">
                    <small class="form-text text-danger"></small>
                </div>
                <div class="form-group ">
                    <label>メッセージ</label>
                    <textarea cols="5" rows="5" class="form-control"></textarea>
                    <small class="form-text text-danger"></small>
                </div>
                <div class="form-group ">
                    <label>開始時刻:</label>
                    <div class="hour">
                        <select class="form-control col-4 d-inline-block">
                            <option>Select A</option>
                        </select>
                        <p class="col-1 d-inline-block">時</p>
                        <select class="form-control col-4  d-inline-block">
                            <option>Select A</option>
                        </select>
                        <p class="col-1 d-inline-block">分</p>
                    </div>
                    <label>終了時刻</label>
                    <div class="min">
                        <select class="form-control col-4 d-inline-block">
                            <option>Select A</option>
                        </select>
                        <p class="col-1 d-inline-block">時</p>
                        <select class="form-control col-4  d-inline-block">
                            <option>Select A</option>
                        </select>
                        <p class="col-1 d-inline-block">分</p>
                    </div>
                    
                </div>
                <div class="text-center">
                <button type="submit" class="btn btn-primary btn-lg bg-success border-0">投稿</button>
                </div>
        </form>
        </div>
    </div>
</template>