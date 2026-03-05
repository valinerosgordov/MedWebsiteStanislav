namespace RegistrationApp.Core.Common;

public class Result
{
    public Error? Error { get; }
    public bool IsSuccess => Error is null;
    public bool IsFailure => !IsSuccess;

    protected Result() => Error = null;
    protected Result(Error error) => Error = error;

    public static Result Success() => new();
    public static Result Failure(Error error) => new(error);
    public static Result<T> Success<T>(T value) => new(value);
    public static Result<T> Failure<T>(Error error) => new(error);
}

public class Result<T> : Result
{
    public T? Value { get; }

    internal Result(T value) : base() => Value = value;
    internal Result(Error error) : base(error) => Value = default;

    public static implicit operator Result<T>(T value) => new(value);
    public static implicit operator Result<T>(Error error) => new(error);
}
