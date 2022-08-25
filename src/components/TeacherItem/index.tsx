import React from "react";


import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import api from "../../services/api";
import './styles.css'


export interface Teacher {
    id: number,
    avatar: string,
    bio: string,
    cost: string,
    name: string,
    subject: string,
    whatsapp: string
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function updateTotalCOnnections(id:number){
        api.post('connections', {
            user_id: id
        }).then(() => {
            alert('Conexão realizada com sucesso')
        }).catch(() => {
            alert('Erro ao realizar conexão')
        })
    }

    return (
        <article className='teacher-item'>
            <header>
                <img src={teacher.avatar} alt={`Ìmagem de ${teacher.name}`} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>
            <footer>
                <p>Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a type='button' href={`https://wa.me/${teacher.whatsapp}`} target={`_blank`} onClick={(e) => updateTotalCOnnections(teacher.id)}>
                    <img src={whatsappIcon} alt="Icone whatssap" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}


export default TeacherItem