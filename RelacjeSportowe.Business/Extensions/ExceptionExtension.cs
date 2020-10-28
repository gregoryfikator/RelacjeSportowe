using RelacjeSportowe.Business.Exceptions;
using System;

namespace RelacjeSportowe.Business.Extensions
{
    public static class Throw
    {
        public static ExceptionThrower<T> Exception<T>(int errorCode)
            where T : BusinessLogicException
        {
            return new ExceptionThrower<T>(errorCode);
        }

        public class ExceptionThrower<T>
            where T : BusinessLogicException
        {
            private readonly int _errorCode;

            public ExceptionThrower(int errorCode)
            {
                _errorCode = errorCode;
            }

            public void If(bool condition)
            {
                if (condition)
                {
                    throw (T)Activator.CreateInstance(typeof(T), _errorCode);
                }
            }
        }
    }
}
