var send_mat = { send_type: 0, id: id_material, rown: 0, material: "sdfsd", price: "33323" }

var updarr = [];

function AddDataModel(send_type, id, rown, material, price) {
    send_mat.send_type = send_type;
    send_mat.id = id;
    send_mat.rown = rown;
    send_mat.material = material;
    send_mat.price = price;
    //   console.log('AddDataModelmat send_type=' + send_mat.send_type + ' id=' + send_mat.id + ' material=' + send_mat.material + ' price=' + send_mat.price + ' send_mat.rown ='+ send_mat.rown )
}

function DoMat(send_type, id, rown, material, price) {
    try {
    //   console.log('DoMat send_type=' + send_type + ' id=' + id + ' material=' + material + ' price=' + price + 'rown=' + rown + 'maxrow=' + maxrow)
        switch (send_type) {
            case 1:
                updarr.push({
                    send_type: send_type,
                    id: id,
                    material: material,
                    price: price
                })
                maxrow++;
                MatTable.methods.addMat({
                    id: 0,
                    rown: maxrow,
                    material: material,
                    price: price
                });
                CalcSumm()
                break;
            case 2:
                if ((id > 0) && (id !== null)) {
                    updarr.push({
                        send_type: send_type,
                        id: id,
                        material: material,
                        price: price
                    });
                    MatTable.methods.updMat(rown, { id: id, rown: rown, material: material, price: price });
                    CalcSumm()
                }
                break;
            case 3:
                MatTable.methods.delMat({
                    id: id,
                    rown: rown,
                    material: material,
                    price: price
                });
                updarr.push({
                    send_type: send_type,
                    id: id,
                    material: 0,
                    price: 0
                })
                CalcSumm()
                break;
            default:
                return
                break;
        }
    } catch (err) {
        console.log('Error on DoMat');
    }
}

function WriteTitle() {
    switch (send_mat.send_type) {
        case 1:
            return "Добавить материал"
            break;
        case 2:
            return "Изменить материал"
            break;
        case 3:
            return "Удалить материал"
            break;
        default:
            return ""
            break;
    }
}

function CreateModalWindow() {

    let ModalForm = {
        props: ['id', 'material', 'price'],
        template: `
            <form action="">
                <div class="modal-card" style="width: auto">
                    <section class="modal-card-body">
                        <header class="modal-card-head">
                              <b-field :label="WriteTitle()">
                            </b-field>
                        </header>
                        <b-field label="Название" >
                            <b-input
                                :value="material"
                                @input="send_mat.material = event.target.value" :disabled="send_mat.send_type == 3">
                            </b-input>
                        </b-field>
                        <b-field label="Стоимость" :visible="false">
                            <b-input
                                :value="price"
                                @input="send_mat.price = event.target.value" :disabled="send_mat.send_type == 3">
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">Close</button>
                        <button class="button is-primary" type="button" @click="DoMat(send_mat.send_type, send_mat.id, send_mat.rown, send_mat.material, send_mat.price); $parent.close()">ok</button>
                    </footer>
                </div>
            </form>
        `
    };


    var matnew = {
        components: {
            ModalForm
        },

        data() {
            return {
                isComponentModalActive: false,
                formProps: send_mat
            };


        }
    };

    var editmat = new Vue(matnew);
    editmat.$mount('#editmat');
}

CreateModalWindow();