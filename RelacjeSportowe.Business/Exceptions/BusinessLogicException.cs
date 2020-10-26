using RelacjeSportowe.Services;
using System;

namespace RelacjeSportowe.Business.Exceptions
{
    public class BusinessLogicException : Exception
    {
        public int ErrorCode { get; private set; }

        public int StatusCode { get; private set; }

        public BusinessLogicException(int errorCode)
        {
            StatusCode = Constants.StatusCodes.BusinessLogicException;
            ErrorCode = errorCode;
        }

        public BusinessLogicException(int errorCode, string message, Exception inner) : base(message, inner)
        {
            StatusCode = Constants.StatusCodes.BusinessLogicException;
            ErrorCode = errorCode;
        }
    }
}
