import type { Access, PayloadRequest } from 'payload';

// Para la propiedad "admin" específicamente (debe devolver boolean)
export const adminOnly = ({ req }: { req: PayloadRequest }) => {
  return Boolean(req.user?.role === 'admin');
};

// Para todas las demás propiedades de access
export const admin: Access = ({ req: { user } }) => {
  return user?.role === 'admin';
};

export const authenticated: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'editor';
};

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user?.role === 'admin' || user?.role === 'editor') {
    return true;
  }

  return {
    _status: {
      equals: 'published'
    }
  };
};
