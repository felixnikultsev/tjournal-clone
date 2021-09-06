import React from 'react';
import styles from './AuthDialog.module.scss';
import { Dialog, DialogContent, TextField, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { LoginForm, MainForm, RegistrationForm } from './Forms';

type FormType = 'main' | 'login' | 'registration';

type AuthDialogProps = {
  visible: boolean;
  onClose: () => void;
};

export const AuthDialog: React.FC<AuthDialogProps> = (props) => {
  const { visible, onClose } = props;

  const [formType, setFormType] = React.useState<FormType>('main');

  return (
    <Dialog open={visible} onClose={onClose} maxWidth={'xs'} classes={{ paper: styles.authDialog }} fullWidth>
      <DialogContent>
        <Typography className={styles.authTitle}>
          {formType === 'main' ? (
            'Вход в RJ'
          ) : (
            <div className={'d-flex align-center'}>
              <ArrowBack className={'mr-10'} style={{ cursor: 'pointer' }} onClick={() => setFormType('main')} />
              <span>К авторизации</span>
            </div>
          )}
        </Typography>
        {formType === 'main' && <MainForm openLoginHandler={() => setFormType('login')} />}
        {formType === 'login' && <LoginForm openRegistrationHandler={() => setFormType('registration')} />}
        {formType === 'registration' && <RegistrationForm openLoginHandler={() => setFormType('login')} />}
      </DialogContent>
    </Dialog>
  );
};
