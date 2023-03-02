import { Formik, Field } from 'formik';
import { Form, FormField, ErrorMessage } from './RecipeForm.styled';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

const RecipeSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  image: Yup.string().min(3, 'Too Short!').required('Required'),
  time: Yup.number().positive('time > 0').required('Required'),
  servings: Yup.number().positive('servings > 0').required('Required'),
  calories: Yup.number().positive('calories > 0').required('Required'),
  difficulty: Yup.string()
    .oneOf(['easy', 'medium', 'hard'])
    .required('Required'),
});

export const RecipeForm = ({ onSave }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        image: '',
        time: 0,
        servings: 0,
        calories: 0,
        difficulty: 'easy',
      }}
      validationSchema={RecipeSchema}
      onSubmit={(values, actions) => {
        onSave({
          ...values,
          id: nanoid(),
        });
        actions.resetForm();
      }}
    >
      <Form>
        <FormField>
          Name
          <Field name="name" />
          <ErrorMessage name="name" component="div" />
        </FormField>
        <FormField>
          Image
          <Field name="image" />
          <ErrorMessage name="image" component="div" />
        </FormField>

        <FormField>
          Time
          <Field name="time" type="number" />
          <ErrorMessage name="time" component="div" />
        </FormField>
        <FormField>
          Servings
          <Field name="servings" type="number" />
          <ErrorMessage name="servings" component="div" />
        </FormField>
        <FormField>
          Calories
          <Field name="calories" type="number" />
          <ErrorMessage name="calories" component="div" />
        </FormField>

        <FormField>
          Difficulty
          <Field name="difficulty" as="select">
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </Field>
          <ErrorMessage name="difficulty" component="div" />
        </FormField>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
