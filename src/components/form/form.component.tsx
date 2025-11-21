import React, { Component } from 'react'
import { TForm } from './../../types/form.type.tsx'
import {timezones} from "../../data/timezones.data.tsx";
import {FormComponentProps} from "./form.component.props.tsx";

import './form.component.css';

class FormComponent extends Component<FormComponentProps> {
    timezones = timezones;

    submitAction = (event: React.BaseSyntheticEvent) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const name = formData.get('name') as string;
        const timezone = formData.get('zone') as string;

        const watch: TForm = { name, timezone };
        this.props.submitAction(watch);

        event.target.reset();
    }

  render() {
    return (
      <form onSubmit={this.submitAction} id='form' name='watch' className="form">
        <div className="form-group">
          <label htmlFor="name">Название</label>
          <input form='form' name='name' id="name" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="zone">Временаая зона</label>
          <select form='form' id="zone" name="zone">
            {this.timezones.map((timezone) => (
              <option key={timezone} value={timezone}>{timezone}</option>
            ))}
          </select>
        </div>
        <button type="submit">Добавить</button>
    </form>
    )
  }
}

export default FormComponent
