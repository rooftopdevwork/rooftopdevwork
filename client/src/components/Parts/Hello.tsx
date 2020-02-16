import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = () => <h1>Hello from!</h1>;
