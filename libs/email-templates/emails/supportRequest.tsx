import {Button, Html} from '@react-email/components';
import * as React from 'react';

export default function Email() {
  return (
    <Html>
      <Button style={{background: '#000', color: '#fff', padding: '12px 20px'}}>
        Click me
      </Button>
    </Html>
  );
}
