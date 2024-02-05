import {Ability} from '@casl/ability';
import * as React from 'react';
import {createContextualCan} from '@casl/react';

export const AbilityContext = React.createContext(new Ability());
export const Can = createContextualCan(AbilityContext.Consumer);
