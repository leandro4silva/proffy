import React, { FormEvent, useState } from 'react'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import TeacherItem, { Teacher } from '../../components/TeacherItem'


import api from '../../services/api'
import { ReactComponent as SearchIcon } from '../../assets/images/icons/search.svg'
import './styles.css'


function TeacherList() {


    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })


        setTeachers(response.data)
    }


    return (
        <div id="page-teacher-list" className='container' >
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id='search-teachers' onSubmit={searchTeachers}>
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
                        value={subject} onChange={e => { setSubject(e.target.value) }}
                    >
                    </Select>

                    <Select
                        name="week_day"
                        label="Dia da semana"
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
                        value={week_day} onChange={(e) => setWeekDay(e.target.value)}
                    >
                    </Select>
                    <Input
                        type="time"
                        name='time'
                        label='Hora'
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}>
                    </Input>

                    <button type='submit'>
                        <SearchIcon></SearchIcon>
                    </button>

                </form>
            </PageHeader>
            <main>
                {

                    teachers.length > 0 ?
                        teachers.map((teacher: Teacher) => {
                            return <TeacherItem key={teacher.id} teacher={teacher}></TeacherItem>
                        }) :
                        <div>
                            <p>Nenhum professor encontrado
                                com sua pesquisa.</p>
                        </div>

                }


            </main>
        </div>
    )
}

export default TeacherList