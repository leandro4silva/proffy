import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'


import PageHeader from '../../components/PageHeader'

import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'
import api from '../../services/api'

function TeacherForm() {

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ])

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ])
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();


        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!')
            navigate('/')
        }).catch(() => {
            alert('Erro no cadastro')
        })
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        });

        setScheduleItems(updateScheduleItems)
    }

    return (
        <div id='page-teacher-form' className='container'>
            <PageHeader title="Que incrível que você quer dar aulas."
                description="O primeiro passo, é preencher esse formulário de inscrição." />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            label="Nome completo"
                            name="name" value={name}
                            onChange={(e) => { setName(e.target.value) }}>
                        </Input>
                        <Input
                            label="Avatar"
                            name="cost"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}>
                        </Input>
                        <Input
                            label="Whatsapp"
                            name="whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}>
                        </Input>
                        <Textarea
                            name='bio'
                            label='Biografia'
                            value={bio} onChange={(e) => { setBio(e.target.value) }}>
                        </Textarea>
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            options={
                                [
                                    { value: 'Artes', label: 'Artes' },
                                    { value: 'Biologia', label: 'Biologia' },
                                    { value: 'Ciências', label: 'Ciências' },
                                    { value: 'Educação Fisica', label: 'Educação Fisica' },
                                    { value: 'Fisica', label: 'Fisica' },
                                    { value: 'Geografia', label: 'Geografia' },
                                    { value: 'História', label: 'História' },
                                    { value: 'Matemática', label: 'Matemática' },
                                    { value: 'Química', label: 'Química' },
                                    { value: 'Ingles', label: 'Ingles' },
                                ]
                            }
                            value={subject} onChange={(e) => { setSubject(e.target.value) }}
                        >
                        </Select>

                        <Input
                            label="Custo da sua hora por aula"
                            name="avatar"
                            value={cost} onChange={(e) => { setCost(e.target.value) }}
                        >
                        </Input>
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                            <button type='button' onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>


                        {scheduleItems.map((item, index) => {
                            return (

                                <div key={item.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={item.week_day}
                                        options={
                                            [
                                                { value: '0', label: 'Domingo' },
                                                { value: '1', label: 'Segunda-feira' },
                                                { value: '2', label: 'Terça-feira' },
                                                { value: '3', label: 'Quarta-feira' },
                                                { value: '4', label: 'Quinta-feira' },
                                                { value: '5', label: 'Sexta-feira' },
                                                { value: '6', label: 'Sabado' },
                                            ]
                                        }
                                        onChange={(e) => { setScheduleItemValue(index, 'week_day', e.target.value) }}
                                    >
                                    </Select>

                                    <Input
                                        name='from'
                                        label='Das'
                                        type="time"
                                        value={item.from}
                                        onChange={(e) => { setScheduleItemValue(index, 'from', e.target.value) }}
                                    >
                                    </Input>
                                    <Input
                                        name='to'
                                        label='Até'
                                        type="time"
                                        value={item.to}
                                        onChange={(e) => { setScheduleItemValue(index, 'to', e.target.value) }}
                                    >
                                    </Input>
                                </div>)
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                            Importante! <br />
                            Preencha todos os dados
                        </p>

                        <button type='submit'> Salvar cadastro</button>
                    </footer>
                </form>
            </main>

        </div>
    )
}


export default TeacherForm