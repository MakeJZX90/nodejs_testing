

var data = [
    { "id": 0, "name": "Тест", "quantity": "5", "sum": "6000" },
    { "id": 1, "name": "Тест", "quantity": "5", "sum": "6000" },
    { "id": 2, "name": "Тест", "quantity": "5", "sum": "6000" }
];

const EmpTable = {
    data() {
        return {
            data,
            isPaginated: true,
            selected: data[0],
            gridColumns: ['id', 'name', 'quantity', 'sum'],
            isPaginationSimple: false,
            paginationPosition: 'bottom',
            defaultSortDirection: 'asc',
            sortIcon: 'arrow-up',
            sortIconSize: 'is-small',
            currentPage: 1,
            editable: true,
            perPage: 3,
            numClicks: 0,
            msg: ""
        };

    },
    methods: {
        "addRow": function addRow(Json) {
            data.push(Json);
        },
        "ClickRow": function(row) {
            let selected_row;
            setTimeout(function() {
                selected_row = JSON.parse($('#hidden_1').text());
                window.oncontextmenu = function() {
                    conf.confirm(selected_row.id);
                }
            }, 300);

            this.numClicks++;
            if (this.numClicks > 0) { 
                var self = this;
                setTimeout(function() {
                    switch (self.numClicks) { 
                        case 1:
                            self.msg = 'One click';
                            //   console.log('one  =' + JSON.stringify(selected_row.id) + ' self.numClicks = ' + self.numClicks+ 'msg='+self.msg);
                            break;
                        case 2:
                            self.msg = 'Double click';
                            //  console.log('double  =' + JSON.stringify(selected_row.id) + ' self.numClicks = ' + self.numClicks + 'msg='+self.msg);
                            break;
                        default:
                            self.msg = 'default click';
                            //      console.log('default =' + JSON.stringify(selected_row.id));
                            GetMatFromRow(selected_row.id);
                    }
                    self.numClicks = 0; 
                }, 300); 
            } 
        }
    }
};

const app = new Vue(EmpTable);
app.$mount('#app');


const dialogconf = {
    methods: {
        confirm(id) {
            this.$buefy.dialog.confirm({
                message: 'Удалить?',
                onConfirm: () => {
                    this.$buefy.toast.open('удален');
                    DeleteEmp(id);
                }
            });

        }
    }
};

const conf = new Vue(dialogconf);
conf.$mount('#conf');

var send_json = { surname: "", name : "", pattern: ""}

const ModalForm = {
    props: ['surname', 'name', 'pattern'],
    template: `
        <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Новый пользователь</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Фамилия">
                        <b-input
                            :value="surname"
                            @input="send_json.surname = event.target.value">
                        </b-input>
                    </b-field>

                    <b-field label="Имя">
                        <b-input
                            :value="name"
                            @input="send_json.name = event.target.value">
                        </b-input>
                    </b-field>
                    <b-field label="Отчество">
                        <b-input
                            :value="pattern"
                            @input="send_json.pattern = event.target.value">
                        </b-input>
                    </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary" type="button" @click="InsEmp( send_json.surname, send_json.name, send_json.pattern); $parent.close()">ok</button>
                </footer>
            </div>
        </form>
    `
};


const usernew = {
    components: {
        ModalForm
    },

    data() {
        return {
            isComponentModalActive: false,
            formProps: {
                surname: '',
                name: '',
                pattern: ''
            }
        };


    }
};

const user = new Vue(usernew);
user.$mount('#user');


